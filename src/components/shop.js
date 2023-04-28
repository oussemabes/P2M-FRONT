import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import PaginationControls from "./PaginationControls";


export default function Shop(props) {
  let categoryid=props.categoryid
  const [products, setProducts] = useState([]);
  const [test, setTest] = useState([]);


  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("0");
  const [checkboxes, setCheckboxes] = useState([
    { id: 0, isChecked: true },
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
    { id: 5, isChecked: false },
    { id: 6, isChecked: false },
    { id: 7, isChecked: false },
    { id: 8, isChecked: false },
    { id: 9, isChecked: false },
    { id: 10, isChecked: false },
    { id: 11, isChecked: false },
    { id: 12, isChecked: false },
    { id: 13, isChecked: false },
    { id: 14, isChecked: false },
  ]);

  async function countData() {
    const res = await axios.get(`http://194-195-247-34.ip.linodeusercontent.com/backend/auction/count`);
    setTotalPages(Math.ceil(res.data[0].count / limit));
  }
  async function countDataByCategoryId(category_id) {
    const res = await axios.get(
      `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/countbycategory/${category_id}`
    );
    setTotalPages(Math.ceil(res.data[0].count / limit));
  }


  React.useEffect(() => {
    if (categoryId === "0"){
    countData();
    axios
      .get(`http://194-195-247-34.ip.linodeusercontent.com/backend/auction/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err));
    axios
      .get(
        `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/display?page=${currentPage}&limit=${limit}`
      )
      .then((res) => {
        setProducts(res.data);
        setAllProducts(res.data);
      })
      .catch((err) => setError(err));}
  }, [currentPage,limit]);
  React.useEffect(() => {
    console.log("2")
    if (categoryId !== "0") {
      countDataByCategoryId(categoryId);
    } else {
      countData();
    }
  }, [limit, categoryId]);





  React.useEffect(() => {
    console.log("3")
    if (categoryId !== "0") {
      console.log("categoryId", categoryId);
      axios
        .get(
          `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/displaybycategory/${categoryId}/?page=${currentPage}&limit=${limit}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => setError(err));
    } else {
      setProducts(allProducts);
    }
  }, [currentPage, limit, categoryId]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1)
  };

  const handleRadioChange = (event) => {
    event.preventDefault();
    setCurrentPage(1)
    setCategoryId(event.target.value);
    const updatedCheckboxes = checkboxes.map((cb) => {
      if (cb.id.toString() == event.target.value) {
        return { ...cb, isChecked: !cb.isChecked };
      }
      return {...cb, isChecked: false};
    });
    console.log(updatedCheckboxes)
    setCheckboxes(updatedCheckboxes);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-3">
          <h1 className="h2 pb-4">Products</h1>
          <ul className="list-unstyled templatemo-accordion">
            <li className="pb-3">
              <label className="collapsed d-flex justify-content-between h5 text-decoration-none">
                Show ended bids
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineCheckbox1"
                  value="option1"
                />
              </label>
              <label className="collapsed d-flex justify-content-between h5 text-decoration-none">
                Show featured bids
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineCheckbox1"
                  value="option1"
                />
              </label>{" "}
              <label className="collapsed d-flex justify-content-between h5 text-decoration-none">
                Show actual bids
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineCheckbox1"
                  value="option1"
                />
              </label>
            </li>
          </ul>

          <h1 className="h2 pb-4">Categories</h1>

          <ul className="list-unstyled templatemo-accordion">
            <li className="pb-3">
              <label
                key={0}
                className="collapsed d-flex justify-content-between h5 text-decoration-none"
              >
                See all products
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineCheckbox1"
                  value={0}
                  name="abc"
                  checked={checkboxes[0].isChecked}
                  onChange={handleRadioChange}
                />
              </label>
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="collapsed d-flex justify-content-between h5 text-decoration-none"
                >
                  {category.category}
                  <input
                    className="form-check-input"
                    type="radio"
                    id="inlineCheckbox1"
                    value={category.id}
                    name="abc"
                    checked={checkboxes[category.id].isChecked}
                    onChange={handleRadioChange}
                  />
                </label>
              ))}
            </li>
          </ul>
        </div>
        <div className="col-lg-9">
          <div className="row">
            {products.map((product) => (
              <Card
                key={product.id}
                date={new Date(product.date)}
                name={product.productName}
                description={product.productDescription}
                image={product.productImage}
                category_id={product.category_id}
                id={product.id}
                shop={true}
              />
            ))}{" "}
          </div>
          <div>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handleLimitChange={handleLimitChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
