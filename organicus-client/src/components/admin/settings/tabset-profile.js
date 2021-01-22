import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import {User,Settings} from 'react-feather'
import {isAuthenticated} from '../../../api/auth';

const{user,token} = isAuthenticated()

export class Tabset_profile extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" />Profile</Tab>
                        <Tab className="nav-link"><Settings className="mr-2" />Edit</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Profile</h5>
                            <div className="table-responsive profile-table">
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr>
                                            <td>First Name:</td>
                                            <td>{user.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td>Last Name:</td>
                                            <td>{user.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Mobile Number:</td>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Location:</td>
                                            <td>{user.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {/* <div className="tab-pane fade"> 
                            <div className="account-setting">
                                
                                <h5 className="f-w-600 f-16">Notifications</h5>
                                <div className="row">
                                    <div className="col">
                                        <label className="d-block" >
                                            <input className="checkbox_animated" id="chk-ani" type="checkbox" defaultChecked />
                                            Allow Desktop Notifications
                                                    </label>
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani1" type="checkbox" />
                                            Enable Notifications
                                                    </label>
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            Get notification for my own activity
                                                    </label>
                                        <label className="d-block mb-0" >
                                            <input className="checkbox_animated" id="chk-ani3" type="checkbox" defaultChecked />
                                            DND
                                                    </label>
                                    </div>
                                </div>
                            </div>
                            <div className="account-setting deactivate-account">
                                <h5 className="f-w-600 f-16">Delete Account</h5>
                                <div className="row">
                                    <div className="col">
                                        <label className="d-block" >
                                            <input className="radio_animated" id="edo-ani3" type="radio" name="rdo-ani1" defaultChecked />
                                            No longer usable
                                                    </label>
                                        <label className="d-block">
                                            <input className="radio_animated" id="edo-ani4" type="radio" name="rdo-ani1" />
                                            Want to switch on other account
                                                    </label>
                                        <label className="d-block mb-0">
                                            <input className="radio_animated" id="edo-ani5" type="radio" name="rdo-ani1" defaultChecked />
                                            Other
                                                    </label>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary">Delete Account</button>
                            </div>
                        {/* </div> */}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Tabset_profile
