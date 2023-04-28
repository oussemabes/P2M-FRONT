import React from "react";

export default function About() {
  return (
    <div>
      <section style={{ backgroundColor: "#ECF8F6" }} className=" py-5">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 ">
              <h1>About Us</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src="/about.png"
                alt="About Hero"
                style={{ width: "250px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5 justify-content-center">
        <div className="row text-center pt-5 pb-3 ">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Our Services</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-3 pb-5">
            <div
              className="h-100 py-5 services-icon-wap shadow"
              style={{ backgroundColor: "#226D68" }}
            >
              <div className="h1 text-light text-center">
                <i className="fa fa-truck fa-lg"></i>
              </div>
              <h2 className="h5 mt-4 text-center">Delivery Services</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div
              className="h-100 py-5 services-icon-wap shadow"
              style={{ backgroundColor: "#226D68" }}
            >
              <div className="h1 text-light text-center">
                <i className="fa fa-percent"></i>
              </div>
              <h2 className="h5 mt-4 text-center">Promotion</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div
              className="h-100 py-5 services-icon-wap shadow"
              style={{ backgroundColor: "#226D68" }}
            >
              <div className="h1 text-light text-center">
                <i className="fa fa-user"></i>
              </div>
              <h2 className="h5 mt-4 text-center">24 Hours Service</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 colorabout">
        <div className="container my-4">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Our Sponsor</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="col-lg-9 m-auto tempaltemo-carousel">
              <div className="row d-flex flex-row">
                <div className="col">
                  <div
                    className="carousel slide carousel-multi-item pt-2 pt-md-0"
                    id="templatemo-slide-brand"
                    data-bs-ride="carousel"
                  >
                    <div
                      className="carousel-inner product-links-wap"
                      role="listbox"
                    >
                      <div className="carousel-item active">
                        <div className="row">
                          <div className="col-6 p-md-5">
                            <img
                              className="img-fluid brand-img"
                              src="https://www.ecoles.com.tn/sites/default/files/universite/logo/sup-com-logo.jpg"
                              alt="Logo1"
                            />
                          </div>
                          <div className="col-6 p-md-5">
                            <img
                              className="img-fluid brand-img"
                              src="https://www.ecoles.com.tn/sites/default/files/universite/logo/sup-com-logo.jpg"
                              alt="Logo2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
