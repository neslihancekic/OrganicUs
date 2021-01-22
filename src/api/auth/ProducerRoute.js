import React, {Component} from 'react'
import{Route,Redirect} from 'react-router-dom'
import{isAuthenticated} from './index'

const ProducerRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 'Producer' ? (
                <Component {...props} />
                ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: {from: props.location}}}
                />
            )
        } 
    />
);

export default ProducerRoute