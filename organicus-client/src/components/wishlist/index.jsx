import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import Breadcrumb from '../common/breadcrumb';
import {addToCart, removeFromWishlist} from '../../actions'

const API = process.env.NODE_ENV

class wishList extends Component {


    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){

        const {Items, symbol} = this.props;
        console.log(Items)
        return (
            <div>
                <Breadcrumb title={'Favorites'} />
                {Items.length>0 ?
                <section className="wishlist-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                    <tr className="table-head">
                                        <th scope="col">image</th>
                                        <th scope="col">product name</th>
                                        <th scope="col">price</th>
                                        <th scope="col">availability</th>
                                        <th scope="col">action</th>
                                    </tr>
                                    </thead>
                                    {Items.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item._id}`}>
                                                        <img src={`${API}/getProduct/Picture/${item._id}`} alt="" />
                                                    </Link>
                                                </td>
                                                <td><Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item._id}`}>{item.Title}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <p>in stock</p>
                                                        </div>
                                                        <div className="col-xs-3">
                                                        
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="javascript:void(0)" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                                <a href="javascript:void(0)" className="cart" onClick={() => this.props.addToCart(item, 1)}>
                                                                    <i className="fa fa-shopping-cart"></i>
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.IsDiscounted ? (
                                                            <h2 className="td-color">{symbol}{item.Price-(item.Price*item.DiscountPercentage/100)}
                                                            <del><span className="money">{symbol}{item.Price}</span></del></h2>
                                                        ):(
                                                            <h2 className="td-color">{symbol}{item.Price}</h2>
                                                        ) }</td>
                                                <td >
                                                    <p>in stock</p>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                    <a href="javascript:void(0)" className="cart" onClick={() => this.props.addToCart(item, 1)}>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody> )
                                    })}
                                </table>
                            </div>
                        </div>
                        <div className="row wishlist-buttons">
                            <div className="col-12">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">continue shopping</Link>
                                <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid">check out</Link>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>Favorite List is Empty</strong>
                                        </h3>
                                        <h4>Explore more shortlist some items.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    Items: state.wishlist.list,
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps,
    {addToCart, removeFromWishlist}
)(wishList)