import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import Breadcrumb from "../../common/breadcrumb";
import {Link} from 'react-router-dom';

// Import custom components
import {Slider3} from "../../../services/script"
import Trading from "./tranding"
import Special from "../common/special"
import {
    svgFreeShipping,
    svgservice,
    svgpayment
} from "../../../services/script"
import HeaderTwo from "../../common/headers/header-two"
import FooterOne from "../../common/footers/footer-one"

class Vegetables extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `#` );
    }
    render(){
        return (
            <div>
                <section className="p-0">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home39 text-center">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="slider-contain">
                                                    <div>
                                                        <h4>fresh</h4>
                                                        <h1>organic pruducts</h1><a href={`${process.env.PUBLIC_URL}/products`}  className="btn btn-solid">shop
                                                        now</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home38 text-center">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="slider-contain">
                                                    <div>
                                                        <h4>organic</h4>
                                                        <h1>homemade jars</h1><a href={`${process.env.PUBLIC_URL}/products`}  className="btn btn-solid">shop
                                                        now</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home45 text-center">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="slider-contain">
                                                    <div>
                                                        <h4>from producer</h4>
                                                        <h1> homemade foods</h1><a href={`${process.env.PUBLIC_URL}/products`}  className="btn btn-solid">shop
                                                        now</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*collection banner layout*/}
                <section className="banner-padding absolute-banner pb-0">
                    <div className="container absolute-bg">
                        <div className="service p-0">
                            <div className="row">
                                <div className="col-md-4 service-block">
                                    <div className="media">
                                        <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                        <div className="media-body">
                                            <h4>free shipping</h4>
                                            <p>free shipping in your country</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 service-block">
                                    <div className="media">
                                        <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                        <div className="media-body">
                                            <h4>24 X 7 service</h4>
                                            <p>online service for new customer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 service-block">
                                    <div className="media">
                                        <div dangerouslySetInnerHTML={{ __html: svgpayment }} />
                                        <div className="media-body">
                                            <h4>online payment</h4>
                                            <p>new online special festival offer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*collection banner layout end*/}

                {/*Category Two*/}
                <section className="p-0 ratio2_1">
                    <div className="container-fluid">
                        <div className="row category-border">
                            <div className="col-sm-4 border-padding">
                            <Link to={`${process.env.PUBLIC_URL}/products`}>
                                <div className="category-banner">
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/category1.jpg`} className="img-fluid blur-up lazyload bg-img"
                                             alt="" />
                                    </div>
                                    <div className="category-box">
                                        <a href="#">
                                            <h2>Sauces</h2>
                                        </a>
                                    </div>
                                </div>
                            </Link>
                            </div>
                            <div className="col-sm-4 border-padding">
                                
                                <Link to={`${process.env.PUBLIC_URL}/products`}>
                                <div className="category-banner">
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/category2.jpg`} className="img-fluid blur-up lazyload bg-img"
                                             alt="" />
                                    </div>
                                    <div className="category-box">
                                        <a href="#">
                                            <h2>Jams</h2>
                                        </a>
                                    </div>
                                </div>
                                </Link>
                            </div>
                            <div className="col-sm-4 border-padding">
                                
                                <Link to={`${process.env.PUBLIC_URL}/products`}>
                                <div className="category-banner">
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/category3.jpg`} className="img-fluid blur-up lazyload bg-img"
                                             alt="" />
                                    </div>
                                    <div className="category-box">
                                        <a href="#">
                                            <h2>Vegetables</h2>
                                        </a>
                                    </div>
                                </div>
                                
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
                
                {/*category End*/}

                {/*product section Start*/}
                <Trading type={'vegetable'} />
                {/*product section End*/}

                {/*Parallax banner
                <section className="p-0">
                    <div className="full-banner parallax-banner15 parallax text-left p-left">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>OrganicUs</h2>
                                        <h3 className="white">organic food market</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                Parallax banner end*/}

                {/*product-box slider*/}
                <Special type={'vegetable'} />
                {/*product-box slider end*/}

                
            </div>
        )
    }
}


export default Vegetables