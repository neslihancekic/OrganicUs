import React, {Component} from 'react';
import { Link} from 'react-router-dom';

import {SlideUpDown} from "../../../services/script"
import LogoImage from "../headers/common/logo"

class FooterOne extends Component {

    componentDidMount(){
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function(elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }


    render () {

        return (
            <footer className="footer-light">
                
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row footer-theme partition-f">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-title footer-mobile-title">
                                    <h4>about</h4>
                                </div>
                                <div className="footer-contant">
                                    <div className="footer-logo">
                                        <LogoImage logo={this.props.logoName} />
                                    </div>
                                    <p>Welcome to OrganicUs. Our aim is to bring fresh organic products from local producers to your door. Healthy days. :) </p>
                                    <div className="footer-social">
                                        <ul>
                                            <li>
                                                <a href={'https://www.facebook.com/'} ><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                            </li>
                                            <li>
                                                <a href={'https://plus.google.com/'} ><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                                            </li>
                                            <li>
                                                <a href={'https://twitter.com'}><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                            </li>
                                            <li>
                                                <a href={'https://instagram.com'}><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                            </li>
                                            <li>
                                                <a href={'https://rss.com/'}><i className="fa fa-rss" aria-hidden="true"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col offset-xl-1">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>Pages</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><Link to={`${process.env.PUBLIC_URL}/products`} >all products</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/complaint`} >give a complaint</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/contact`} >Contact</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>store information</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul className="contact-list">
                                            <li><i className="fa fa-map-marker"></i>OrganicUs 
                                            </li>
                                            <li><i className="fa fa-phone"></i>Call Us: 123-456-7898</li>
                                            <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                                href="#">organicus.team@gmail.com</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        )
    }
}

export default FooterOne;