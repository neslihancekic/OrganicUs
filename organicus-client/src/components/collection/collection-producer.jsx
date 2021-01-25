import React, {Component} from 'react';
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";

import { connect } from 'react-redux'
import {filterBrand, filterColor, filterPrice} from '../../actions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {listProducerProducts} from '../../api/admin';

class CollectionProducer extends Component {
    constructor() {
        super();
        this.state = {
            layoutColumns:3,
            products:[]
        };
    }
    async componentDidMount(){
        const filteredBrands = this.props.filters.brand;
        if(filteredBrands.length>0){
            filteredBrands.splice(0, filteredBrands.length);
        }
        if(this.props.location.prop){
            
            filteredBrands.push(this.props.location.prop.category)
        }
        console.log(this.props.id)
        await listProducerProducts(this.props.id)
        .then(data => {
            if(data.error){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                this.setState({
                    products: data
                });
                console.log(this.state.products)
            }
        })
    }
    

    LayoutViewClicked(colums) {
        this.setState({
            layoutColumns:colums
        })
    }

    openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }
    
    render (){
        return (
            <div>
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 collection-filter">

                                    <StickyBox offsetTop={20} offsetBottom={20}>
                                        <div>
                                            <Filter products= {this.state.products} />
                                        </div>
                                    </StickyBox>
                                    {/*side-bar banner end here*/}
                                </div>
                                <div className="collection-content col">
                                    <div className="page-main-content ">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        <div className="top-banner-content small-section">
                                                            {this.state.products.length>0 && <h4>products of {this.state.products[0].ProducerID.firstName} {this.state.products[0].ProducerID.lastName} (Rate:{this.state.products[0].ProducerID.Star}/5 | Person that rated: {this.state.products[0].ProducerID.RatedCount})</h4>}
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-xl-12">
                                                                        <div className="filter-main-btn">
                                                                            <span onClick={this.openFilter}
                                                                                className="filter-btn btn btn-theme"><i
                                                                                className="fa fa-filter"
                                                                                aria-hidden="true"></i> Filter</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <FilterBar products= {this.state.products} onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/*Products Listing Component*/}
                                                        <ProductListing products= {this.state.products} colSize={this.state.layoutColumns}/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            
        )
    }
}

const  mapStateToProps = (state, ownProps) => {
    let productId = ownProps.match.params.id;
    console.log(productId)
    return {
        id : productId,
        filters: state.filters,
        symbol: state.data.symbol
    }
}

export default connect(
    mapStateToProps,
    { filterBrand, filterColor, filterPrice }
)(CollectionProducer);

