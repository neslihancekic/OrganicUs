import React, { Component } from 'react'
import man from '../../../../assets/images/dashboard/man.png'

import {isAuthenticated} from '../../../../api/auth';

export class User_panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:''
        }
        
    }
    componentDidMount() {
        const{user}=isAuthenticated()
        this.setState({name:user.firstName})
    }

    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={man} alt="#" />
                    </div>
                    {this.state.name.length ? (
                    <h6 className="mt-3 f-14">{this.state.name}</h6>):(<h6 className="mt-3 f-14"></h6>)}
                    <p>Producer</p>
                </div>
            </div>
        )
    }
}

export default User_panel

