import React, {Component,Fragment} from 'react';
import { withTranslate } from 'react-redux-multilingual'
import {Helmet} from 'react-helmet'

// Custom Components
import HeaderTwo from './common/headers/header-two';

import FooterOne from "./common/footers/footer-one";

//Admin Components 

import Sidebar from './admin/common/sidebar_components/sidebar';
import Right_sidebar from './admin/common/right-sidebar';
import Footer from './admin/common/footer';
import Header from './admin/common/header_components/header';

import { ToastContainer } from 'react-toastify';

// ThemeSettings


import {isAuthenticated} from '../api/auth'



class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (

                <div>
                    { ( !isAuthenticated() || (isAuthenticated() && isAuthenticated().user.role === 'Customer')) && (
                        <Fragment>
                            <Helmet>
                                <title>OrganicUs</title>
                            </Helmet>
                            <HeaderTwo logoName={'logo.png'}/>
                            {this.props.children}
                            <FooterOne logoName={'logo.png'}/>

                        </Fragment>
                    )}
                    {(isAuthenticated() && isAuthenticated().user.role === 'Producer' ) && (
                        <Fragment>
                            <Helmet>
                                <title>OrganicUs - Producer</title>
                            </Helmet>
                            <div className="page-wrapper" >
                                <Header />
                                <div className="page-body-wrapper">
                                    <Sidebar />
                                    <Right_sidebar />
                                    <div className="page-body">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                    
                    <ToastContainer/>
                </div>
            
        );
    }
}

export default withTranslate(App);
