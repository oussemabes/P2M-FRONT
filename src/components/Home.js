import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import PaginationControls from "./PaginationControls";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [error, setError] = useState(null);
  const [limite, setLimite] = useState(3);

  const handleShowMore = () => {
    setLimite(categories.length);
  };

  const handleShowLess = () => {
    setLimite(3);
  };

  async function countData() {
    const res = await axios.get(`http://194-195-247-34.ip.linodeusercontent.com/backend/auction/count`);
    setTotalPages(Math.ceil(res.data[0].count / limit));
  }

  useEffect(() => {
    axios
      .get(`http://194-195-247-34.ip.linodeusercontent.com/backend/auction/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err));

    countData();
  }, []);
  useEffect(() => {
    countData();
  }, [limit, totalPages]);
  useEffect(() => {
    axios
      .get(
        `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/display?page=${currentPage}&limit=${limit}`
      )
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err));
  }, [currentPage, limit]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <section className="home">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1>Start Bidding Now!</h1>
            </div>
          </div>

          <div className="row ">
            {products.map((product) => (
              <Card
                key={product.id}
                date={new Date(product.date)}
                name={product.productName}
                description={product.productDescription}
                image={product.productImage}
                category_id={product.category_id}
                id={product.id}
                shop={false}
              />
            ))}
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
      </section>

      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="row">
          {categories.slice(0, limite).map((category, index) => (
            <CategoryCard
              key={category.id}
              categoryName={category.category}
              categoryImage={category.categoryImage}
              categoryId={category.id}
            />
          ))}
          {limite < categories.length && (
            <button
              class="btn"
              style={{ backgroundColor: "#226D68", color: "#ECF8F6" }}
              onClick={handleShowMore}
            >
              <i class="fa fa-arrow-down"></i>Show More
            </button>
          )}
          {limite === categories.length && (
            <button
              onClick={handleShowLess}
              class="btn"
              style={{ color: "#226D68" }}
            >
              <i class="fa fa-arrow-up"></i> Show Less
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
