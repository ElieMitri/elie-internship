import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./hotcollection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [hotCollection, setHotCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setHotCollection(response.data);
    console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const PrevArrow = ({ onClick }) => (
    <button className="slick-prev custom-prev" onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path d="M15 4L7 12L15 20" />
      </svg>
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="slick-next custom-next" onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path d="M9 4L17 12L9 20" />
      </svg>
    </button>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 763,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="carousel-container">
            <Slider {...settings}>
              {loading
                ? new Array(6).fill(0).map((_, id) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={id}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <div className="main-item-input">
                            <div className="animated-poster-background-input"></div>
                            <div className="animated-title-background-input"></div>
                            <Link to="/item-details">
                              <img
                                className="animated-title-background-input lazy img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to="/author">
                              <img
                                className="animated-title-background-input lazy pp-coll"
                                alt=""
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4 className="animated-title-background-input"></h4>
                            </Link>
                            <span className="animated-title-background-input"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : hotCollection.map((response, id) => (
                    <div className="response__wrapper">
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12 response__wrap"
                        key={id}
                      >
                        <div className="nft__wrapper">
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <Link to="/item-details">
                                <img
                                  src={response.nftImage}
                                  className="lazy img-fluid"
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="nft_coll_pp">
                              <Link to="/author">
                                <img
                                  className="lazy pp-coll"
                                  src={response.authorImage}
                                  alt=""
                                />
                              </Link>
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="nft_coll_info">
                              <Link to="/explore">
                                <h4>{response.title}</h4>
                              </Link>
                              <span>ERC-{response.code}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
