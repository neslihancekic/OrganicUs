import React, {Component} from 'react';
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import custom Components
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'
import { getProduct } from '../../api/product';

const API = process.env.NODE_ENV



class NoSideBar extends Component {

    constructor() {
        super();
        this.state = {
            nav1: null,
            nav2: null,
            item: undefined
        };
    }

    async componentDidMount() {
        
        const response = await getProduct(this.props.id);
        if(response == undefined){ 
            toast.error('Error occured!')
        }else{
            console.log(response)
            this.setState({item:response})
        }
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });

    }

    render(){
        const {symbol, addToCart, addToCartUnsafe, addToWishlist} = this.props
        const {item} = this.state
        var products = {
            fade: true
        };

        var productsnav = {
            slidesToShow: 3,
            slidesToScroll:1,
            swipeToSlide:true,
            draggable:true,
            focusOnSelect: true
        };
        

        return (
            <div>

                {/*Section Start*/}
                {(item)?
                <div>
                <section >
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 product-thumbnail">
                                    <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                        
                                        <ImageZoom image={`${API}/getProduct/Picture/${item._id}`} className="img-fluid image_zoom_cls-0" />
                                           
                                    </Slider>
                                </div>
                                <DetailsWithPrice symbol={symbol} item={item} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                            </div>
                        </div>
                    </div>
                </section> 
                <section className="tab-product m-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-12">
                            <DetailsTopTabs item={item} />
                        </div>
                    </div>
                </div>
                </section>

                <RelatedProduct categoryId={item.CategoryID}/> 
                </div>: ''}
                {/*Section End*/}

                
            </div>
        )
    }
}

const  mapStateToProps = (state, ownProps) => {
    let productId = ownProps.match.params.id;
    console.log(productId)
    return {
        id : productId,
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, {addToCart, addToCartUnsafe, addToWishlist}) (NoSideBar);