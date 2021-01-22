import React, { Component, Fragment } from 'react'
import data from '../../assets/admin/data/orders';
import Datatable from '../admin/common/datatable'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GetOrders} from '../../api/cart'

import Image from '../../components/admin/common/image';
import {isAuthenticated} from '../../api/auth'
const API = process.env.NODE_ENV
export class CustomerOrders extends Component {
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
                    item['OrderId'] = or.orderId
                    var pictures=[]
                    var quantitys=[]
                    var status=[]
                    for(const pro of or.orderItems){
                        pictures.push(`<img src="${API}/getProduct/Picture/${pro.ProductId}" href="${process.env.PUBLIC_URL}/product/${pro.ProductId}" height="50px"/>`)
                        quantitys.push(pro.Quantity)
                        if(pro.Prepearing==true && pro.Shipped==false ){
                            status.push(`<span className="badge badge-secondary">Prepearing</span>`)
                        }else if( pro.Shipped==true ){
                            status.push(`<span className="badge badge-success">Shipped</span>`)
                        }else{
                            status.push(`<span className="badge badge-info">Waiting</span>`)
                        }
                    }
                    item['Picture'] = pictures
                    item['Quantity'] = quantitys
                    item['Status'] = status
                    item['TotalPrice'] = or.TotalPrice
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

export default CustomerOrders
