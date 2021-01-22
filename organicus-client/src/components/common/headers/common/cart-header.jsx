import React, {Component} from 'react';
import {Link} from 'react-router-dom'
const API = process.env.NODE_ENV
const CartHeader  = ({item, total, symbol, removeFromCart}) => (
            <li >
                <div className="media">
                    <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}><img alt="" className="mr-3" src={`${API}/getProduct/Picture/${item._id}`} /></Link>
                    <div className="media-body">
                        <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}><h4>{item.Title}</h4></Link>
                        <h4><span>{item.qty} x {symbol} {item.IsDiscounted ? ((item.Price*item.DiscountPercentage/100)):(item.Price)}</span></h4>
                    </div>
                </div>
                {/*<span>{cart}</span>*/}
                <div className="close-circle">
                    <a href={null} onClick={ removeFromCart}><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
            </li>
        )



export default CartHeader;
