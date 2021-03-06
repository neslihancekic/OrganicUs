import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';

const API = process.env.NODE_ENV

class ProductListItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onClickHandle(img) {
        this.setState({ image : img} );
    }

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        if(this.props.product.stock >= this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }


    render() {
        const {product, symbol, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked} = this.props;
        const {open} = this.state;

            let RatingStars = []
            for(var i = 0; i < product.rating; i++) {
                RatingStars.push(<i className="fa fa-star" key={i}></i>)
            }

        return (

                    <div className="product-box">
                        <div className="img-wrapper">
                            <div className="front">
                            <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
                                <img src={`${API}/getProduct/Picture/${product._id}`} alt="" width="250px"/>
                            </Link>
                            </div>
                            <div className="cart-info cart-wrap">
                                <button title="Add to cart" onClick={() => onAddToCartClicked(product, 1)}>
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                </button>
                                <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </a>
                                <a href="javascript:void(0)" data-toggle="modal"
                                   data-target="#quick-view"
                                   title="Quick View"
                                   onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                            </div>
                            

                        </div>
                        <div className="product-detail">
                            <div>
                                <div className="rating">
                                    {RatingStars}
                                </div>
                                <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
                                    <h6>{product.Title}</h6>
                                </Link>
                                {product.IsDiscounted ? (<h4>{symbol}{product.Price-(product.Price*product.DiscountPercentage/100)}
                                                        <del><span className="money">{symbol}{product.Price}</span></del></h4>
                                                    )
                                                    :
                                                    (<h4>{symbol}{product.Price}
                                                    </h4>)}
                            </div>
                        </div>
                    <Modal open={open} onClose={this.onCloseModal} center>
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content quick-view-modal">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-6  col-xs-12">
                                            <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
                                                <img src={`${API}/getProduct/Picture/${product._id}`} alt="" width="300px"/>
                                            </Link>
                                            </div>
                                            <div className="col-lg-6 rtl-text">
                                                <div className="product-right">
                                                    <h2> {product.Title} </h2>
                                                    {product.IsDiscounted ? (<h3>{symbol}{product.Price-(product.Price*product.DiscountPercentage/100)}
                                                        <del><span className="money">{symbol}{product.Price}</span></del></h3>
                                                    )
                                                    :
                                                    (<h3>{symbol}{product.Price}
                                                    </h3>)}
                                                    
                                                    
                                                    <div className="border-product">
                                                        <h6 className="product-title">product details</h6>
                                                        
                                                        <div  dangerouslySetInnerHTML={{__html: product.Info}}></div>
                                                    </div>
                                                    <div className="product-description border-product">
                                                        
                                                        <h6 className="product-title">quantity</h6>
                                                        <div className="qty-box">
                                                            <div className="input-group">
                                                              <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                              </span>
                                                                <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                                <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                                </button>
                                                               </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-buttons">
                                                        <button  className="btn btn-solid" onClick={() => onAddToCartClicked(product, this.state.quantity)} >add to cart</button>
                                                        <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`} className="btn btn-solid">view detail</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Modal>
                </div>
        )
    }
}

export default ProductListItem;