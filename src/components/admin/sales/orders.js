import React, { Component, Fragment } from 'react'
import Datatable from '../common/datatable'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GetOrders} from '../../../api/admin'

import {isAuthenticated} from '../../../api/auth'
const API = process.env.NODE_ENV
export class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myData: []
        }
    }

    async componentDidMount(){
        const{user,token} = isAuthenticated()
        await GetOrders(user._id,token)
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                var order =[]
                for(const or of data){
                    var item ={}

                    item['OrderId'] = or.order.OrderId
                    item['Customer First Name'] = or.customer.firstName
                    item['Customer Last Name'] = or.customer.lastName
                    item['Customer Email'] = or.customer.email
                    item['Customer Phone'] = or.order.OrderContactPhone
                    item['Customer Shipping Address'] = or.order.ShippingAddress
                    item['Customer Billing Address'] = or.order.BillingAddress
                    item['Picture'] = `<img src="${API}/getProduct/Picture/${or.order.ProductId}" href="${process.env.PUBLIC_URL}/product/${or.order.ProductId}" height="50px"/>`
                    item['Quantity'] = or.order.Quantity
                    if(or.order.Prepearing==true && or.order.Shipped==false ){
                        item['Status']=`Prepearing`
                    }else if( or.order.Shipped==true ){
                        item['Status']=`Shipped`
                    }else{
                        item['Status']=`Waiting`
                    }
                    item['Price'] = or.order.Price
                    order.push(item)
                }
                
                this.setState({
                    myData: order
                });
                console.log(this.state.myData)
            }
        })
    }
    render() {
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Orders</h5>
                                </div>
                                <div className="card-body order-datatable">
                                {this.state.myData.length>0 ? (<Datatable
                                            multiSelectOption={false}
                                            myData={this.state.myData}
                                            pageSize={10}
                                            pagination={true}
                                            class="-striped -highlight"
                                        />):('Loading')}
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Orders
