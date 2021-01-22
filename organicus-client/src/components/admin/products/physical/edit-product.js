import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import {plus,one} from '../../../../assets/images/pro3/1.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {isAuthenticated} from '../../../../api/auth';
import {updateProduct,listCategory} from '../../../../api/admin';
import {getProduct} from '../../../../api/product';

const API = process.env.NODE_ENV



export class Edit_product extends Component {
    

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            ProductId : this.props.location.prop.id._id,
            Title:"",
            CategoryId:"",
            Price:0,
            Picture: "",
            Pic: "",
            Stock: 0,
            DiscountPercentage: 0,
            Info: "",
            categories: [],
            dummyimgs: [
                { img: plus },
            ]
        }
    }

    onChange(evt){
      var newContent = evt.editor.getData();
      
      this.setState({
        Info: newContent
        })
    }

    componentDidMount() {
        getProduct (this.state.ProductId)
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                this.setState({
                    Title:data.Title,
                    CategoryId:data.CategoryID,
                    Price:data.Price,
                    Stock: data.Stock,
                    DiscountPercentage: data.DiscountPercentage,
                    Info: data.Info,
                });
            }
        })
       listCategory ()
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                this.setState({
                    categories: data.data,
                    CategoryId: data.data[0]._id
                });
            }
        })
        
    }

    IncrementItem = () => {
        
        this.setState(prevState => {
            if (prevState.Stock < 9) {
                return {
                    Stock: prevState.Stock + 1
                }
            } else {
                return null;
            }
        });
        
    }
    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.Stock > 0) {
                return {
                    Stock: prevState.Stock - 1
                }
            } else {
                return null;
            }
        });
        
    }

    handleChange(e) 
    {
        this.setState({ [e.target.name] : e.target.value });
    }

    clickSubmit() {
        let formData = new FormData()
        const { Title,
        CategoryId,
        Price,
        Picture,
        Stock,
        DiscountPercentage,
        Info} = this.state;
        const{user,token}=isAuthenticated()
        formData.append("Title",Title)
        formData.append("CategoryID",CategoryId)
        formData.append("Price",Price)
        if(Picture!=""){
            formData.append("Picture",Picture)
        }
        formData.append("Stock",Stock)
        formData.append("Info",Info)
        formData.append("ProducerID",user._id)
        formData.append("DiscountPercentage",DiscountPercentage)
        if(DiscountPercentage>0){
            
            formData.append("IsDiscounted",true)
        }
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        updateProduct(user._id,token,formData,this.state.ProductId)
        .then(data => {
            console.log(data)
            if(data.error){ 
                toast.error('Error occured!')
            }else{
                toast.success('Product Edited!')
                this.props.history.push(`${process.env.PUBLIC_URL}/admin/product-list`)
            }
        })
    }

    //image upload
    _handleSubmit(e) {
        e.preventDefault();
        
    }

    _handleImgChange(e, i) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        
        const { dummyimgs,Picture } = this.state;

        reader.onloadend = () => {
            dummyimgs[i].img = reader.result;
            this.setState({
                Picture : file,
                Pic : reader.result,
                dummyimgs,
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Edit Product" parent="Physical" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Edit Product</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-5">
                                            <div className="add-product">
                                                <div className="row">
                                                    <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                    
                                                    <img src={`${API}/getProduct/Picture/${this.state.ProductId}`} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                            
                                                    </div>
                                                    <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                        <ul className="file-upload-product">
                                                            {
                                                                this.state.dummyimgs.map((res, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <div className="box-input-file">
                                                                                <input className="upload" type="file" onChange={(e) => this._handleImgChange(e, i)} />
                                                                                <img src={one} style={{ width: 50, height: 50 }} />
                                                                                <a id="result1" onClick={(e) => this._handleSubmit(e.target.id)}></a>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form" onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Product Name :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control"  id="validationCustom01" type="text" name="Title" value={this.state.Title} onChange={this.handleChange.bind(this)} required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control mb-0" name="price" id="validationCustom02" type="number" value={this.state.Price}  name="Price" onChange={this.handleChange.bind(this)} required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Discount :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control mb-0"  id="validationCustom03" type="number"  name="DiscountPercentage" value={this.state.DiscountPercentage}  onChange={this.handleChange.bind(this)}  required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                                <div className="form">
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4 mb-0" >Select Category :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <select className="form-control digits" id="exampleFormControlSelect1" name="CategoryId" defaultChecked={this.state.CategoryId} onChange={this.handleChange.bind(this)}>
                                                                {this.state.categories.length ? (this.state.categories.map((res, i) => {
                                                                            return (
                                                                                <Fragment>
                                                                                    {this.state.CategoryId===res._id ? (
                                                                                    <option selected="selected" value={res._id} key={i}>{res.name}</option>):(
                                                                                    <option value={res._id} key={i}>{res.name}</option>)}
                                                                                </Fragment>
                                                                                    
                                                                            )
                                                                        })
                                                                    ):("Loading")
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Total Products :</label>
                                                        <fieldset className="qty-box ml-0">
                                                            <div className="input-group bootstrap-touchspin">
                                                                <div className="input-group-prepend">
                                                                    <button className="btn btn-primary btn-square bootstrap-touchspin-down" type="button" onClick={this.DecreaseItem} >
                                                                        <i className="fa fa-minus"></i>
                                                                    </button>
                                                                    <span className="input-group-text bootstrap-touchspin-prefix" ></span>
                                                                
                                                                    <input className="touchspin form-control" type="text" value={this.state.Stock}/>
                                                                
                                                                    <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                                                
                                                                    <button className="btn btn-primary btn-square bootstrap-touchspin-up" type="button" onClick={this.IncrementItem}>
                                                                        <i className="fa fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                        <div className="col-xl-8 col-sm-7 description-sm">
                                                            <CKEditors 
                                                                activeclassName="p10"
                                                                content={this.state.Info}
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChange
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" onClick={this.clickSubmit.bind(this)} className="btn btn-primary">Add</button>
                                                    <button type="button" onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/admin/product-list`)}className="btn btn-light">Discard</button>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Edit_product
