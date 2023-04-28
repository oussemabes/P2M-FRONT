import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft, calculateTimeIn } from "../utils/utils.ts";
import "../../src/index.css";
import { FaCentercode } from "react-icons/fa";

export default function Card(props) {
  let date = props.date;
  let name = props.name;
  let description = props.description;
  let image = props.image;
  let category_id = props.category_id;
  let id = props.id;
  let shop = props.shop;
  let Link = `/bid/${id}`;
  const navigateToproductpage=()=>
  {
    window.location.href = Link;
  }
  const [price, setPrice] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [startBid, setStartBid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Date(date));
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
    const getLastBid = async (product_id) => {
      try {
        const res = await axios.get(
          `http://194-195-247-34.ip.linodeusercontent.com/backend/bid/${product_id}`
        );
        if (res.data.bidAmount) {
            setPrice(parseFloat(res.data.bidAmount))
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLastBid(props.id)
  }, []);

  useEffect(() => {
    const getCategoryName = async (category_id) => {
      try {
        const res = await axios.get(
          `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/getcategory/${category_id}`
        );
        setCategoryName(res.data.category);
      } catch (err) {
        console.log(err);
      }
    };

    getCategoryName(category_id);
    timer(Date(date));
  }, [props]);

  useEffect(() => {
    setTimeout(
      () =>
        setTimeLeft(
          date > Date.now() ? calculateTimeLeft(date) : calculateTimeIn(date)
        ),
      1000
    );
    setStartBid(date > Date.now() ? false : true);
  }, [timeLeft, props]);
  return (

    <div className={`col-12 col-md-${shop ? 6 :4} mb-4 `}>

      <div className="card h-100 ">
        <div className="containerr ">
          <a href={Link}>
            <img
              src={image}
              width="150px"
              height="330px"
              className="card-img-top"

              alt="..."
            ></img>
          </a>
          <div
            className="centered"
            style={startBid ? { backgroundColor: "#226D68" } : {backgroundColor: "#ECF8F6"}}
          >
            <p style={startBid ? { color: "#ECF8F6" } : {}}>
              {String(timeLeft.days).padStart(2, "0")}D:{" "}
              {String(timeLeft.hours).padStart(2, "0")}H:{" "}
              {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
              {String(timeLeft.seconds).padStart(2, "0")}S
            </p>
          </div>
        </div>
        <div className="card-body ">
          <ul className="list-unstyled d-flex justify-content-between">
            <li></li>
            <li className="text-muted text-right">{`Current Price ${price}`}DT</li>
          </ul>
          <div className="right">
            <a href={Link} className="h2 text-decoration-none text-dark">
              {name}
            </a>
            <p className="card-text">{description}</p>
            <p className="card-text">category : {categoryName}</p>
          </div>
          
        </div>
       { startBid ?  <center><button onClick={navigateToproductpage} class="button-77" style={{fontSize:'16px',marginBottom:'10px',paddingBottom:'18px',width:"200px",paddingLeft:"33px",marginLeft:"10px"}} role="button">Start bid now</button></center>: <center><button onClick={navigateToproductpage} disabled class="button-77" style={{fontSize:'18px',marginBottom:'10px',paddingBottom:'18px',width:"200px",paddingLeft:"33px",marginLeft:"10px"}} role="button">Start bid now</button></center>} <br></br>
      </div>
    </div>
  );
}
