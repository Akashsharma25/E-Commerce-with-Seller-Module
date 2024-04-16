import React from "react";
import { useState, useEffect } from "react";
import swal from "sweetalert";

const Myhome = () => {
  let [allproduct, updateProduct] = useState([]);

  const getProduct = () => {
    let url = "http://localhost:1234/product";
    fetch(url)
      .then((response) => response.json())
      .then((productArray) => {
        updateProduct(productArray.reverse());
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addtocart = async (productinfo) => {
    productinfo["qty"] = 1;

    let url = "http://localhost:1234/cart";
    let postdata = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(productinfo),
    };
    try {
      await fetch(url, postdata)
        .then((response) => response.json())
        .then((pinfo) => {
          swal(productinfo.name, " Added in your cart", "success");
        });
    } catch (error) {
      swal(productinfo.name, " Already in Your Cart", "warning");
    }
  };

  return (
    <>
      {/* corosel start */}
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="b4.jpg"
              className="d-block w-100"
              height={380}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Shop For Home</h5>
              <p>The online shop is open 24/7 all the days</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="b2.jpg"
              className="d-block w-100"
              height={380}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>50% Discount For All Items</h5>
              <p>If you can buy 4 will get 8 items</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="b3.png"
              className="d-block w-100"
              height={380}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Kids, Female, Male, All Types of Dress</h5>
              <p>You can return in 15 days if not satisfied with the Product</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* corosel end */}
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search.."
            />
          </div>
        </div>
        <div className="row mb-5 mt-5">
          {allproduct.map((product, index) => {
            return (
              <div className="col-lg-3 mb-4" key={index}>
                <div className="p-3 border-rounded">
                  <h4 className="text-center text-primary">{product.name}</h4>
                  <img
                    src={product.photo}
                    alt=""
                    className="rounded"
                    height={200}
                    width="100%"
                  />
                  <p className="container mt-2 mb-2">{product.details}</p>

                  <p className="p-2 rounded border text-primary text-center">
                    ₹ {product.price}
                  </p>
                  <p className="d-grid text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={addtocart.bind(this, product)}
                    >
                      <i className="fa fa-cart-shopping"></i> Add to Cart
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Myhome;
