import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick';
import Modal from 'react-responsive-modal';


class DetailsWithPrice extends Component {

    constructor (props) {
        super (props)
        this.state = {
            open:false,
            quantity:1,
            stock: 'InStock',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        if(this.props.item.Stock==0){
            
            this.setState({stock: 'Out of Stock !'})
        }
        this.setState({
            nav3: this.slider3
        });
    }

    minusQty = () => {
        if(this.props.item.Stock <= this.state.quantity-1) {
            this.setState({quantity: this.state.quantity-1})
            this.setState({stock: 'InStock'})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }

    plusQty = () => {
        if(this.props.item.Stock >= this.state.quantity+1) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){
        const {symbol, item, addToCartClicked, BuynowClicked, addToWishlistClicked} = this.props

        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide:true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {item.Title} </h2>
                    
                    {item.IsDiscounted ? (
                    <div>
                        <h4>
                            <del>{symbol}{item.Price}</del>
                            <span>{item.DiscountPercentage}% off</span>
                        </h4>
                        <h3>{symbol}{item.Price-(item.Price*item.DiscountPercentage/100)}</h3>
                    </div>
                        ):(<h3>{symbol}{item.Price} </h3>)
                        }
                    
                    <div className="product-description border-product">
                        
                        <span className="instock-cls">{this.state.stock}</span>
                        {item.Stock>0 && (
                        <div>
                        <h6 className="product-title">quantity</h6>
                        <div className="qty-box">
                            <div className="input-group">
                                  <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                     <i className="fa fa-angle-left"></i>
                                    </button>
                                  </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                <i className="fa fa-angle-right"></i>
                                </button>
                               </span>
                            </div>
                        </div>
                        </div>
                        )}
                    </div>
                    <div className="product-buttons" >
                        {item.Stock>0 ? ( <div><a className="btn btn-solid" onClick={() => addToCartClicked(item, this.state.quantity)}>add to cart</a>
                        <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid" onClick={() => BuynowClicked(item, this.state.quantity)} >buy now</Link></div>):(<a className="btn btn-solid" >notify me when back in stock</a>)}
                        
                    </div>
                    <div className="product-icon">
                        <ul className="product-social">
                                <li><i className="fa fa-star"></i><span>  {item.ProducerID.Star}</span></li>
                        </ul>
                        <Link to={`${process.env.PUBLIC_URL}/producerProducts/${item.ProducerID._id}`} target="_blank"><button className="wishlist-btn"><i
                            className="fa fa-user"></i><span
                            className="title-font">{item.ProducerID.firstName} {item.ProducerID.lastName}</span>
                        </button></Link>
                        <Link to={`${process.env.PUBLIC_URL}/producerProducts/${item.ProducerID._id}`}><button className="wishlist-btn"><i
                            className="fa fa-comment-o"></i><span
                            className="title-font">Send Message About Product</span>
                        </button></Link>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        
                        <div  dangerouslySetInnerHTML={{__html: item.Info}}></div>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                                <button className="wishlist-btn" onClick={() => addToWishlistClicked(item)}><i
                                    className="fa fa-heart"></i><span
                                    className="title-font">Add To WishList</span>
                                </button>
                        </div>
                    </div>
                    
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sheer Straight Kurta</h5>
                            </div>
                            <div className="modal-body">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default DetailsWithPrice;