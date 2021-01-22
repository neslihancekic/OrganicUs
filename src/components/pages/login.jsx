
import React, {Component, useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import Breadcrumb from "../common/breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserHistory} from 'history';

import {listFav} from '../../api/favorite'; 
import {listBasketLines} from '../../api/cart'; 
import {getProduct} from '../../api/product'; 
import {updateCart, updateWishlist} from '../../actions'
import store from '../../store'


import {signin,authenticate, isAuthenticated} from '../../api/auth';

async function setFav(data){
    //fetch favlist
    const d = await listFav(data.user._id,data.token)
    if(d == undefined){ 
        toast.error('Error occured!')
    }else{
        for(const pro of d){
            store.dispatch(updateWishlist(pro.ProductId))
            
        }
    }
}

async function setBasket(data){
    //fetch favlist
    const d = await listBasketLines(data.user._id,data.token)
    if(d == undefined){ 
        toast.error('Error occured!')
    }else{
        for(const pro of d.basketLines){
            const response = await getProduct(pro.ProductId)
            if(response == undefined){ 
                toast.error('Error occured!')
            }else{
                store.dispatch(updateCart(response,pro.Quantity))
            }
        }
    }
}

async function getFavAndBasket(data){
   return await Promise.all([setFav(data), setBasket(data)])
}

const Login = () => {

    
    const history = createBrowserHistory({forceRefresh:true})       
    const [values, setValues] = useState({
        email: '',
        password: '',
        redirectToReferrer: false,

        errors:{}
    })
    

    const {email,password,redirectToReferrer,errors} = values
    const {user,token} = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }


    const clickSubmit = (event) => {
        event.preventDefault();
        if(validate()){
            setValues({ ...values,redirectToReferrer: false})
            signin({email,password})
            .then(data => {
                if(data.error){
                    setValues({...values, redirectToReferrer: false})
                    toast.error(`${data.error}`)
                }
                else{
                    authenticate(data, async () =>{
                        const json = await getFavAndBasket(data)
                        setValues({...values, redirectToReferrer: true})
                    })
                    toast.info("Redirecting...")

                }
            })
        }
    }

    const redirectUser =() => {
        if(redirectToReferrer){
            if(user&& user.role == "Customer"){
                return history.push("/home");
            }else{
                return history.push("admin/dashboard");
            }
        }
    }
    

    const validate=()=>{
        let errors = {};
        let isValid = true;
    
        if (email == "") {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
        }
    
        if (email != "") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(email)) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }
    
        if (password == "") {
          isValid = false;
          errors["password"] = "Please enter your password.";
        }
        setValues({...values, errors: errors})
    
        return isValid;
    }

    return (
        <div>
            <Breadcrumb title={'Login'}/>
            {redirectUser()}
            {/*Login section*/}
            <section className="login-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>Login</h3>
                            <div className="theme-card">
                                <form className="theme-form">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input onChange={handleChange('email')} value={email} type="email" className="form-control" id="email" placeholder="Email"
                                                required="" />
                                        <div className="text-danger">{errors.email}</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="review">Password</label>
                                        <input onChange={handleChange('password')} value={password} type="password" className="form-control" id="review"
                                                placeholder="Enter your password" required="" />      
                                        <div className="text-danger">{errors.password}</div>
                                    </div>
                                    <button onClick={clickSubmit} className="btn btn-solid">Login</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 right-login">
                            <h3>New Customer</h3>
                            <div className="theme-card authentication-right">
                                <h6 className="title-font">Create A Account</h6>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It
                                    allows you to be able to order from our shop. To start shopping click
                                    register.</p>
                                
                                <Link to={`${process.env.PUBLIC_URL}/register`} className="btn btn-solid" data-lng="en">Create an Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
    
}

export default Login