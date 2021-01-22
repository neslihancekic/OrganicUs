import React, {Component, useEffect, useState } from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
import {signup} from '../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Customer',
        errors: {},
    })

    const {firstName, lastName, email,password,role,errors} = values

    const handleChange = name => event => {
        setValues({ ...values, error:false, [name]: event.target.value})
    }


    const clickSubmit = (event) => {
        event.preventDefault();
        if(validate()){
            signup({firstName,lastName,email,password,role})
            .then(data => {
                if(data.error){
                    toast.error(`${data.error}`)
                }
                else{
                    setValues({...values,firstName:'',lastName:'',email:'',password:'',error:''})
                    toast.info( "New account is created. Please login!")
                }
            })
        }
    }

    const validate=()=>{
        let errors = {};
        let isValid = true;
        if (firstName == "") {
            isValid = false;
            errors["firstName"] = "Please enter your first name.";
        }

        if (lastName == "") {
        isValid = false;
        errors["lastName"] = "Please enter your last name.";
        }

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
                <Breadcrumb title={'create account'}/>
                {/*Register section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>create account</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">First Name</label>
                                                <input onChange={handleChange('firstName')} value={firstName} type="text" className="form-control" id="fname"
                                                       placeholder="First Name" required=""/>
                                                <div className="text-danger">{errors.firstName}</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Last Name</label>
                                                <input onChange={handleChange('lastName')} value={lastName}type="text" className="form-control" id="lname"
                                                       placeholder="Last Name" required="" />
                                                <div className="text-danger">{errors.lastName}</div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input onChange={handleChange('email')} value={email} type="email" className="form-control" id="email"
                                                       placeholder="Email" required="" />
                                                
                                                <div className="text-danger">{errors.email}</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input onChange={handleChange('password')} value={password} type="password" className="form-control" id="review"
                                                       placeholder="Enter your password" required="" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-1">
                                                <div className="custom-control custom-radio" >
                                                    <input
                                                        onChange={handleChange('role')}
                                                        value={role}
                                                        className="custom-control-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="inlineRadio1"
                                                        value="Producer"
                                                    />
                                                    
                                                    <label className="custom-control-label" for="inlineRadio1">Producer</label>
                                                    
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-9">
                                                <div className="custom-control custom-radio" >
                                                    <input
                                                        onChange={handleChange('role')}
                                                        value={role}
                                                        className="custom-control-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="inlineRadio2"
                                                        value="Customer"
                                                    />
                                                    
                                                    <label className="custom-control-label" for="inlineRadio2">Customer</label>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <button onClick={clickSubmit} className="btn btn-solid">create Account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }


export default Register