import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

import StarRatingComponent from 'react-star-rating-component'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {getSingleItem, getSpecialCollection} from '../../../services/index'
import {
    addToCart,
    addToWishlist,
    addToCompare,
    incrementQty,
    decrementQty,
    removeFromCart
} from "../../../actions/index";
import ProductItem from './special-product-item';

import {homeTopProducts} from '../../../api/product';

const API = process.env.NODE_ENV
class Special extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:[]
        }
    }
    componentDidMount() {
        homeTopProducts()
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                this.setState({
                    product: data
                });
            }
        })
    }
    render (){

        const { symbol, addToCart, addToWishlist, addToCompare, incrementQty, decrementQty, removeFromCart} = this.props;
        const {product} = this.state;

        return (
            <div>
                {/*Paragraph*/}
                <section className="section-b-space addtocart_count">
                    <div className="full-box">
                        <div className="container">
                            <div className="title4">
                                <h2 className="title-inner4">top rated products</h2>
                                <div className="line"><span></span></div>
                            </div>
                            {product.length ? (<div className="row">
                                <div className="col-md-4">
                                    <div className="theme-card center-align">
                                        <div className="offer-slider">
                                            <div className="sec-1">
                                                <div className="product-box2">
                                                    <div className="media">
                                                        <Link to={`${process.env.PUBLIC_URL}/product/${product[2]._id}`} >
                                                            <img
                                                                className="img-fluid blur-up lazyload"
                                                                src={`${API}/getProduct/Picture/${product[2]._id}`} alt="" />
                                                        </Link>
                                                        <div className="media-body align-self-center">
                                                        <StarRatingComponent 
                                                            name="rate1" 
                                                            starCount={5}
                                                            value={product[2].Star}
                                                            editing={false}
                                                        />
                                                            <Link to={`${process.env.PUBLIC_URL}/product/${product[2]._id}`} >
                                                                <h6>{product[2].Title}</h6>
                                                            </Link>
                                                            {product[2].IsDiscounted ? (
                                                                <h4>{symbol}{product[2].Price-(product[2].Price*product[2].DiscountPercentage/100)}
                                                                <del><span className="money">{symbol}{product[2].Price}</span></del>
                                                                </h4>
                                                            ):(
                                                                <h4>{symbol}{product[2].Price}
                                                                </h4>
                                                            ) }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-box2">
                                                    <div className="media">
                                                        <Link to={`${process.env.PUBLIC_URL}/product/${product[1]._id}`} >
                                                            <img
                                                                className="img-fluid blur-up lazyload"
                                                                src={`${API}/getProduct/Picture/${product[1]._id}`} alt="" />
                                                        </Link>
                                                        <div className="media-body align-self-center">
                                                        <StarRatingComponent 
                                                            name="rate1" 
                                                            starCount={5}
                                                            value={product[1].Star}
                                                            editing={false}
                                                        />
                                                            <Link to={`${process.env.PUBLIC_URL}/product/${product[1]._id}`} >
                                                                <h6>{product[1].Title}</h6>
                                                            </Link>
                                                            {product[1].IsDiscounted ? (
                                                                <h4>{symbol}{product[1].Price-(product[1].Price*product[1].DiscountPercentage/100)}
                                                                <del><span className="money">{symbol}{product[1].Price}</span></del>
                                                                </h4>
                                                            ):(
                                                                <h4>{symbol}{product[1].Price}
                                                                </h4>
                                                            ) }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 center-slider">
                                    <div>
                                        <div className="offer-slider">
                                            <div>
                                                <ProductItem product={product[0]} symbol={symbol}
                                                             onAddToCompareClicked={() => addToCompare(product[0])}
                                                             onAddToWishlistClicked={() => addToWishlist(product[0])}
                                                             onAddToCartClicked={() => addToCart(product[0], 1)}
                                                             onIncrementClicked={() => addToCart(product[0], 1)}
                                                             onDecrementClicked={() => decrementQty(product[0]._id)}
                                                             onRemoveFromCart={() => removeFromCart(product[0])}  />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="theme-card center-align">
                                        <div className="offer-slider">
                                            <div className="sec-1">
                                                <div className="product-box2">
                                                    <div className="media">
                                                        <Link to={`${process.env.PUBLIC_URL}/product/${product[3]._id}`} >
                                                            <img
                                                                className="img-fluid blur-up lazyload"
                                                                src={`${API}/getProduct/Picture/${product[3]._id}`} alt="" />
                                                        </Link>
                                                        <div className="media-body align-self-center">
                                                        <StarRatingComponent 
                                                            name="rate1" 
                                                            starCount={5}
                                                            value={product[3].Star}
                                                            editing={false}
                                                        />
                                                            <Link to={`${process.env.PUBLIC_URL}/product/${product[3]._id}`} >
                                                                <h6>{product[3].Title}</h6>
                                                            </Link>
                                                            {product[3].IsDiscounted ? (
                                                                <h4>{symbol}{product[3].Price-(product[3].Price*product[3].DiscountPercentage/100)}
                                                                <del><span className="money">{symbol}{product[3].Price}</span></del>
                                                                </h4>
                                                            ):(
                                                                <h4>{symbol}{product[3].Price}
                                                                </h4>
                                                            ) }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-box2">
                                                    <div className="media">
                                                        <Link to={`${process.env.PUBLIC_URL}/product/${product[4]._id}`} >
                                                            <img
                                                                className="img-fluid blur-up lazyload"
                                                                src={`${API}/getProduct/Picture/${product[4]._id}`} alt="" />
                                                        </Link>
                                                        <div className="media-body align-self-center">
                                                        <StarRatingComponent 
                                                            name="rate1" 
                                                            starCount={5}
                                                            value={product[4].Star}
                                                            editing={false}
                                                        />
                                                            <Link to={`${process.env.PUBLIC_URL}/product/${product[4]._id}`} >
                                                                <h6>{product[4].Title}</h6>
                                                            </Link>
                                                            {product[4].IsDiscounted ? (
                                                                <h4>{symbol}{product[4].Price-(product[4].Price*product[4].DiscountPercentage/100)}
                                                                <del><span className="money">{symbol}{product[4].Price}</span></del>
                                                                </h4>
                                                            ):(
                                                                <h4>{symbol}{product[4].Price}
                                                                </h4>
                                                            ) }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>):(
                                'loading...'
                            )}
                            
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, Ownprops) => ({
    product: getSpecialCollection(state.data.products, Ownprops.type),
    symbol: state.data.symbol
})

export default connect(mapStateToProps,
    {
        addToCart,
        addToWishlist,
        addToCompare,
        incrementQty,
        decrementQty,
        removeFromCart
    }) (Special);