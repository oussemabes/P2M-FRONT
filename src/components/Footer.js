import React from "react";
import { useState } from "react";
import axios from "axios";

import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    axios
      .get(`http://194-195-247-34.ip.linodeusercontent.com/backend/auction/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err));
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <footer style={{backgroundColor:"#18534F"}} id="tempaltemo_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pt-5">
              <h2 className=" text-light border-bottom pb-3 border-light logo">
                Auction
              </h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <i className="fas fa-map-marker-alt fa-fw"></i>
                  Sup'com
                </li>
                <li>
                  <i className="fa fa-phone fa-fw"></i>
                  <a className="text-decoration-none" href="tel:010-020-0340">
                    +21652430006 / +2169509351
                  </a>
                </li>
                <li>
                  <i className="fa fa-envelope fa-fw"></i>
                  <a
                    className="text-decoration-none"
                    href="https://www.outlook.com"
                  >
                    Oussema.besbes@supcom.tn / Mahdi.boudaouara@supcom.tn
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 pt-5">
              <h2 className="h2 text-light border-bottom pb-3 border-light">
                Products
              </h2>
              <ul style={{color:"#ECF8F6"}} className="list-unstyled footer-link-list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a className="text-decoration-none" href={`/category/${category.id}`}>
                      {category.category}
                    </a>
                  </li>

                  //<CategoryCard categoryName={category.category} categoryImage={category.categoryImage} categoryId={category.id} />
                ))}
              </ul>
            </div>

            <div className="col-md-4 pt-5">
              <h2 className="h2 text-light border-bottom pb-3 border-light">
                Further Info
              </h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <a className="text-decoration-none" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="text-decoration-none" href="/about">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row text-light mb-4">
            <div className="col-12 mb-3">
              <div className="w-100 my-3 border-top border-light"></div>
            </div>
            <div className="col-auto me-auto">
              <ul className="list-inline text-left footer-icons">
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.facebook.com/profile.php?id=100087212690465"
                  >
                    <BsFacebook />
                  </a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.instagram.com/mahdi.boudaouara/?hl=fr"
                  >
                    <BsTwitter />
                  </a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://twitter.com/Mahdiboudawara1"
                  >
                    <BsInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-100 bg-black py-3">
          <div className="container">
            <div className="row pt-2">
              <div className="col-12">
                <p className="text-left text-light">
                  Copyright &copy; 2023 Auction &copy; By Mahdi&Oussema
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
