import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { formatedTimestamp } from "../utils/utils.ts";
import { calculateTimeLeft, calculateTimeIn } from "../utils/utils.ts";
import { MDBInput } from "mdb-react-ui-kit";
import NotAvailable from "./NotAvailable";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-hot-toast";

export default function PlaceBid({ socket, isAuthenticated }) {
  console.log("socket place bid",socket)
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [price, setPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Date());
  const [startBid, setStartBid] = useState(false);
  const [date, setDate] = useState(Date());
  let { product_id } = useParams();
  // Get the category name for the product
  const getCategoryName = async (category_id) => {
    try {
      const res = await Axios.get(
        `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/getcategory/${category_id}`
      );
      setCategoryName(res.data.category);
    } catch (err) {
      console.log(err);
    }
  };
  const timer = async (date) => {
    if (date > Date.now()) {
      setTimeout(() => setTimeLeft(calculateTimeLeft(date), 1000));
      setStartBid(false);
    } else {
      setTimeout(() => setTimeLeft(calculateTimeIn(date), 1000));
      setStartBid(true);
    }
  };

  useEffect(() => {
    // Fetch product information by product id
    const fetchProduct = async (product_id) => {
      try {
        const res = await Axios.get(
          `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/displayproduct/${product_id}`
        );
        if (res.data) {
          setProduct(res.data);
          getCategoryName(res.data.category_id);
          await timer(new Date(res.data.date));
          setDate(new Date(res.data.date));
        } else {
          const root = ReactDOM.createRoot(document.getElementById("root"));
          return root.render(
            <>
              <Navbar isAuthenticated={isAuthenticated} />
              <NotAvailable />
              <Footer />
            </>
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    // Get last bid on the product
    const getLastBid = async (product_id) => {
      try {
        const res = await Axios.get(
          `http://194-195-247-34.ip.linodeusercontent.com/backend/bid/${product_id}`
        );
        if (res.data.bidAmount) {
          setPrice(parseFloat(res.data.bidAmount));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct(product_id);
    getLastBid(product_id);
  }, [product_id, isAuthenticated]);

  // Update time left and bid status every second
  useEffect(() => {
    timer(date);
  }, [timeLeft, date]);

  // State for bid input
  const [inputPrice, setInputPrice] = React.useState();

  // Handle input changes
  const onChange = (e) => {
    setInputPrice(e.target.value);
  };
  useEffect(() => {
    socket.on("send bid", (bid) => {
      setPrice(parseFloat(bid.bidAmount));
    });
  }, [socket]);

  // Add bid to the product
  async function addBid(e) {
    e.preventDefault();
    if (inputPrice === undefined) {
      toast.error("Bid value required");
      return;
    }
    if (inputPrice <= price) {
      toast.error("Bid value should be higher than actual price");
      return;
    }
    await Axios.post(`http://194-195-247-34.ip.linodeusercontent.com/backend/bid/create`, {
      productId: product_id,
      userId: product.owner_id,
      bidAmount: inputPrice,
      date: formatedTimestamp(),
    })
      .then((res) => {
        setPrice(parseFloat(inputPrice));
        socket.emit("newBid", {
          productId: product_id,
          bidAmount: inputPrice,
          date: formatedTimestamp(),
        });
        toast.success("Bid Inserted");
      })

      .catch((err) => toast.error("bid value should be higher than last bid")
     
      );

  }

  return (
    <section className="bg-light">
      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-5 mt-5">
            <div className="card mb-3">
              <img
                className="card-img img-fluid"
                src={product.productImage}
                alt=""
                id={product.id}
              />
            </div>
          </div>
          <div className="col-lg-7 mt-5">
            <div className="card">
              <div className="card-body">
                <h3>
                  {String(timeLeft.days).padStart(2, "0")}D:{" "}
                  {String(timeLeft.hours).padStart(2, "0")}H:{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}S
                </h3>
                <h1 className="h2">{product.productName}</h1>
                <p className="h3 py-2" id="lastbid">
                  Current Price Point : {price} DT
                </p>

                {startBid ? (
                  <p className="py-2">
                    <span className="list-inline-item text-dark">
                      Number of bids : 55
                    </span>
                  </p>
                ) : (
                  <></>
                )}
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <h6>Category:</h6>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted">
                      <strong>{categoryName}</strong>
                    </p>
                  </li>
                </ul>
                <h6>Description:</h6>
                <p>{product.productDescription}</p>
                <input type="hidden" name="product-title" value="Activewear" />
                {isAuthenticated === true ? (
                  <div className="row">
                    <div className="col-auto">
                      {startBid ? (
                        <ul className="list-inline pb-3">
                          <MDBInput
                            placeholder={price + 0.1}
                            name="price"
                            type="number"
                            step="0.1"
                            min={price + 0.1}
                            onChange={onChange}
                            required
                            label="place a bid"
                          />
                        </ul>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="row pb-3">
                      <div className="col d-grid">
                        {startBid ? (
                          <button
                            type="submit"
                            className="btn btn-lg"
                            style={{
                              backgroundColor: "#226D68",
                              color: "#ECF8F6",
                            }}
                            name="submit"
                            value="addtocard"
                            onClick={addBid}
                          >
                            Place a Bid
                          </button>
                        ) : (
                          <button
                            type="text"
                            className="btn btn-lg"
                            style={{
                              backgroundColor: "#226D68",
                              color: "#ECF8F6",
                            }}
                            name="submit"
                          >
                            The bidding has not started yet!
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="color">
                    Please <a href="/register">sign up</a> to place a bid
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
