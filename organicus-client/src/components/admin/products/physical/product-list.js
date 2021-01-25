import React, { Component,Fragment } from 'react'

import {Link} from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import { Edit, Trash2 } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {createBrowserHistory} from 'history';
import {isAuthenticated} from '../../../../api/auth';
import {listProducerProducts,deleteProduct} from '../../../../api/admin';
const API = process.env.NODE_ENV

export class Product_list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[]
        }
        
    }

    componentDidMount() {
        const{user,token}=isAuthenticated()

        
        listProducerProducts(user._id)
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                this.setState({
                    products: data
                });
            }
        })
    }
    
    clickDelete(id){
        console.log(id)
        const updatedData = this.state.products.filter(x => x._id !== id)
        this.setState({
            products: updatedData
        })

        const{user,token}=isAuthenticated()
        deleteProduct(id,user._id,token)
        .then(data => {
            if(data.error){ 
                toast.error('Error occured!')
            }else{
                toast.success('Product Deleted!')
            }
        })
    }

    
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Product List" parent="Products" />
                <div className="container-fluid">
                    <div className="row products-admin ratio_asos">
                        
                        {this.state.products.length ? (
                            this.state.products.map((myData, i) => {
                                return (
                                    <div className="col-xl-3 col-sm-6" key={i} value={myData._id}>
                                        <div className="card">
                                            <div className="products-admin">
                                                <div className="card-body product-box">
                                                    <div className="img-wrapper">
                                                        <div className="lable-block">
                                                            {(myData.Stock > 0 )?<span className="lable4">In Stock</span> : <span className="lable4">Out of Stock</span> }
                                                            {(myData.IsDiscounted === true )?<span className="lable3">%{myData.DiscountPercentage} </span> : '' }
                                                            </div>
                                                        <div className="front">
                                                            <a ><img className="img-fluid blur-up bg-img lazyloaded" src={`${API}/getProduct/Picture/${myData._id}`} /></a>
                                                            <div className="product-hover">
                                                                <ul>
                                                                    <li>
                                                                        <Link to={{pathname:`${process.env.PUBLIC_URL}/admin/edit-product`, prop:{id:myData}}} onClick={()=> this.forceUpdate()}>
                                                                            <button className="btn" type="button">
                                                                                <Edit className="editBtn" />
                                                                            </button>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button className="btn" type="button"  onClick={() => this.clickDelete(myData._id)}>
                                                                            <Trash2 className="deleteBtn" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail">
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                        <a> <h3 >{myData.Title}</h3></a>
                                                        <h7 >{myData.CategoryID.name}</h7>
                                                        {myData.IsDiscounted ? (
                                                            
                                                            <h4 >{myData.Price*(100-myData.DiscountPercentage)/100} <del >{myData.Price}</del></h4>
                                                        ):(
                                                            <h4 >{myData.Price}</h4>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            ):(<div className="col-xl-3 col-sm-6">No Product!</div>)
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Product_list
