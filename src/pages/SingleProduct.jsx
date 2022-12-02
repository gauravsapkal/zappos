import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import styles from "../components/MenWomenLAndingPage-components/product.module.css";
import MensSlick from "../components/MenWomenLAndingPage-components/MensSlick";

import { Center, Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../Redux/action";
import { useNavigate, useParams } from "react-router-dom";
import Page404 from "./Page404";
// import { useEffect, useState } from "react";
// import {  useParams } from "react-router-dom";

const SingleProduct = () => {
  const toast = useToast();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let { cat, id } = useParams();
  const isauth = useSelector((state) => state.isauth);
  console.log(isauth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const getData = () => {
      fetch(`https://my-json-server-uk9r.onrender.com/${cat}/${id}`)
        .then((res) => res.json())
        .then((res1) => setData(res1))
        .catch((err) => setError(true))
        .finally(() => setLoading(false));
    };
    getData();
  }, []);

  const Cartalert = () => {
    return toast({
      title: "Added to Cart.",
      description: "Your product has beem added to cart successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const AddtoCart = () => {
    if (isauth) {
      dispatch(addtocart(data));
      Cartalert();
    } else {
      navigate("/signin");
    }
  };

  if (loading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          w="250px"
          h="250px"
          mt="100px"
        />
      </Center>
    );
  }

  if (error) {
    return <Page404 />;
  }

  return (
    <>
      <div className="container">
        <div className={styles.parent}>
          <div>
            <img src={data.imageurl} alt="" />
          </div>
          <div>
            <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
              {data.desc}
            </h1>
            <br />
            <h2>
              Online Shopping of Women Dresses. Wear beautiful, gorgeous, and
              chic western dresses by Vero Moda, Harpa, Honey by Pantaloons, and
              Tokyo Talkies to make a red
            </h2>

            <br />
            <h1 style={{ fontWeight: "bolder" }}>{data.brand}</h1>
            <div className={styles.priceFlex}>
              <p> $ {data.price}</p>
            </div>
            <div>
              <button className={styles.shippingBtn}>
                <img
                  src="https://www.zappos.com/marty-assets/shipping-box.dfa1add9e27522acc3ee5d8e061339a9.svg"
                  alt=""
                />
                SHIPS FREE
              </button>
              ⭐⭐⭐⭐⭐{" "}
              <span className={styles.ratingSpan}>({data.ratings})</span>
            </div>
            <br />
            <button
              style={{ margin: "5px 10px", border: "1px solid black" }}
              type="button"
              className="btn btn-light"
            >
              XS
            </button>
            <button
              style={{ margin: "5px 10px", border: "1px solid black" }}
              type="button"
              className="btn btn-light"
            >
              SM
            </button>
            <button
              style={{ margin: "5px 10px", border: "1px solid black" }}
              type="button"
              className="btn btn-light"
            >
              MD
            </button>
            <button
              style={{ margin: "5px 10px", border: "1px solid black" }}
              type="button"
              className="btn btn-light"
            >
              LG
            </button>
            <button
              style={{ margin: "5px 10px", border: "1px solid black" }}
              type="button"
              className="btn btn-light"
            >
              XL
            </button>
            <button
              style={{ margin: "5px 10px", border: "1px solid black" }}
              type="button"
              className="btn btn-light"
            >
              XXL
            </button>
            <br />
            <button className={styles.cartBtn} onClick={AddtoCart}>
              {/* onClick={AddtoCart} */}
              Add To Cart
            </button>
            <div className={styles.lastBox}>
              <strong>FREE</strong> upgraded shipping & returns with
            </div>
            <img
              width={"20%"}
              src="https://www.zappos.com/marty-assets/amazon-prime.2821774c351a0e9079f230ad4b312a71.svg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div>
        <MensSlick />
      </div>

      {/* rating */}
      <div className="container" style={{ marginTop: "4%" }}>
        <hr />
        <h1 style={{ fontSize: "25px", margin: "20px 0px" }}>
          Customer Reviews Product {data.brand} ${data.price}{" "}
        </h1>
        <button style={{ border: "2px solid black", padding: "5px 10px" }}>
          WRITE A REVIEW
        </button>
        <br />
        <br />
        <hr />

        <div style={{ display: "flex", margin: "20px 0px" }}>
          <div>
            <h1 style={{ fontSize: "25px", margin: "20px 0px" }}>
              {data.ratings} TOTAL REVIEW
            </h1>
            <img
              style={{
                height: "100px",
                width: "100px",
                border: "1px solid gray",
                marginTop: "8px",
              }}
              src={data.imageurl}
              alt=""
            />
          </div>
          <div>
            <br />
            <h1 style={{ fontSize: "1.2rem", margin: "20px 0px" }}>
              87% ⭐⭐⭐⭐⭐
            </h1>
            <h1 style={{ fontSize: "1.2rem", margin: "20px 0px" }}>
              54% ⭐⭐⭐⭐
            </h1>
            <h1 style={{ fontSize: "1.2rem", margin: "20px 0px" }}>
              42% ⭐⭐⭐
            </h1>
            <h1 style={{ fontSize: "1.2rem", margin: "20px 0px" }}>10% ⭐⭐</h1>
            <h1 style={{ fontSize: "1.2rem", margin: "20px 0px" }}>4% ⭐</h1>
          </div>
        </div>
        <hr />
      </div>

      {/* other thing */}
      <div className="container" style={{ marginTop: "4%" }}>
        <div style={{ margin: "20px 0px" }}>
          <div>
            <h1 style={{ fontSize: "30px", margin: "20px 0px" }}>
              Show how you wore it!
            </h1>
            <h1 style={{ fontSize: "20px", margin: "20px 0px" }}>
              {" "}
              Be the first to add your Women's Single Breasted Jacket to Knee
              outfit to this gallery!{" "}
            </h1>
          </div>
          <div>
            <button
              style={{
                border: "2px solid black",
                padding: "5px 10px",
                margin: "20px 0px",
              }}
            >
              SHARE YOUR OUTFITS
            </button>
            <br />
          </div>
        </div>
        <hr />
      </div>

      {/* other OUTFIT */}
      <div className="container" style={{ marginTop: "2%" }}>
        <div style={{ margin: "20px 0px" }}>
          <div>
            <h1 style={{ fontSize: "30px", margin: "15px 0px" }}>
              Customer Reviews Norma Kamali Women's Single Breasted Jacket to
              Knee
            </h1>
            <h1 style={{ fontSize: "20px", margin: "15px 0px" }}>
              {" "}
              This product currently has 0 reviews.{" "}
            </h1>
          </div>
          <br />
          <div>
            <button style={{ border: "2px solid black", padding: "5px 10px" }}>
              WRITE A REVIEW
            </button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default SingleProduct;
