import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'
import {isAuthenticated} from '../../../../api/auth'

class TopBar extends Component {
    
    render() {
        const {translate} = this.props;
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>{translate('topbar_title', { theme_name: ' OrganicUs' })}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                                
                                {isAuthenticated() && (
                                    <Fragment>
                                        <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/favorite`}><i className="fa fa-heart" aria-hidden="true"></i>Favorites</Link></li>
                                            <li className="onhover-dropdown mobile-account">
                                            <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                                            <ul className="onhover-show-div">
                                                
                                                <li>
                                                    <Link to={`${process.env.PUBLIC_URL}/dashboard`} data-lng="en">Dashboard</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </Fragment>
                                )}
                                {!isAuthenticated() && (
                                    <Fragment>
                                        <li className="mobile-account"><Link to={`${process.env.PUBLIC_URL}/login`}><i className="fa fa-id-badge" aria-hidden="true"></i>{translate('login')}</Link></li>
                                        <li className="mobile-account"><Link to={`${process.env.PUBLIC_URL}/register`} ><i className="fa fa-id-card" aria-hidden="true"></i>{translate('register')}</Link></li>
                                        
                                    </Fragment>
                                    
                                )}
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(TopBar);