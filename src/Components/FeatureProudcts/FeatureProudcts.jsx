import React, { useContext, useEffect, useState } from "react";
import styles from "./FeatureProudcts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function FeatureProudcts() {
  let { createCart, setNumOfCartItems } = useContext(CartContext);
  let {
    createWishlist,
    setNumOfWishlistItems,
    deleteWishlistItem,
    getWishlist,
  } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [allProudcts, setAllProudcts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [Favorite, setFavorite] = useState(false);

  async function getProudcts() {
    setLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setLoading(false);
    setAllProudcts(data.data);
    console.log(data.data, "fromall");
  }

  async function generateCart(productId) {
    let response = await createCart(productId);

    console.log(response);

    if (response.data.status == "success") {
      toast.success("Done");

      setNumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error("Something is wrong");
    }
  }
  async function wishlistDetails() {
    let response = await getWishlist();
    setWishlistLoaded(true);
    console.log(response.data.data);
    setWishlist(response.data.data);
  }

  async function generateWishlist(productId) {
    let response = await createWishlist(productId);
    console.log("Wishlist update response:", response.data);
    wishlistDetails();

    if (response.data.status === "success") {
      console.log(response.data.data);
      console.log(wishlist, "from wishlist");
      toast.success(response.data.message);
      setFavorite(true);
      setNumOfWishlistItems(response.data.data.length);
    } else {
      toast.error("Something is wrong");
    }

    setLoading(false);
  }

  async function removeFromWishlist(id) {
    let response = await deleteWishlistItem(id);
    wishlistDetails();

    if (response.data.status === "success") {
      toast.success(response.data.message);
      setFavorite(true);
      setNumOfWishlistItems(response.data.data.length);
    } else {
      toast.error("Something is wrong");
    }

    console.log(response.data);
  }

  useEffect(() => {
    getProudcts();
    wishlistDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className={`${styles.spinner} m-auto mt-5 mb-5 `}></div>
      ) : (
        <>
          <div className="container my-5 py-5">
            <div className="row">
              {wishlistLoaded &&
                allProudcts.map((product) => (
                  <div
                    key={product.id}
                    className="col-md-6 col-sm-10 col-s-8 col-lg-4 position-relative "
                  >
                    <div className="product p-2">
                      <Link to={"/product-details/" + product.id}>
                        <img
                          src={product.imageCover}
                          className="w-100"
                          alt=""
                        />
                        <p className="text-main">{product.category.name}</p>
                        <h3 className="h6">
                          {product.title.split(" ").splice(0, 2).join(" ")}
                        </h3>
                      </Link>

                      <div className="d-flex justify-content-between">
                        <p>
                          {product.price} <span className="fs-6">EGP</span>
                        </p>
                        <div className="">
                          <i className="fa fa-star rating-color m-2"></i>
                          {product.ratingsAverage}
                        </div>
                      </div>

                      <button
                        onClick={() => generateCart(product.id)}
                        className={`${styles.button} w-100 bg-main border-sucsess`}
                      >
                        <span>Add to cart</span>
                        <svg
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <defs> </defs>{" "}
                            <g id="cart">
                              {" "}
                              <circle
                                r="1.91"
                                cy="20.59"
                                cx="10.07"
                                class="cls-1"
                              ></circle>{" "}
                              <circle
                                r="1.91"
                                cy="20.59"
                                cx="18.66"
                                class="cls-1"
                              ></circle>{" "}
                              <path
                                d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"
                                class="cls-1"
                              ></path>{" "}
                              <polyline
                                points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"
                                class="cls-1"
                              ></polyline>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </button>

                      {wishlist.find((item) => item.id === product.id) ? (
                        <>
                          <div
                            className={`${styles.btnf} d-block position-absolute top-0 d-flex align-items-left`}
                          >
                            <button
                              className=""
                              onClick={() => removeFromWishlist(product.id)}
                            >
                              <i class="fa-solid fa-heart fs-2"></i>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={`${styles.btn_nf}  position-absolute top-0 d-flex align-items-left`}
                          >
                            <button
                              onClick={() => generateWishlist(product.id)}
                            >
                              <i class="fa-solid fa-heart fs-2"></i>
                            </button>
                          </div>{" "}
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
