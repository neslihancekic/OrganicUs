import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StarRatingComponent from 'react-star-rating-component'
import Modal from 'react-responsive-modal';

import {isAuthenticated} from '../../../api/auth'
import {rateProducer,pushComplaint} from '../../../api/product'
import {updateOrder} from '../../../api/admin'
const{user,token} = isAuthenticated()
export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            open: false,
            openStar: false,
            openComplaint: false,
            activeitem: this.props.myData[0],
            complaint: '',
            selectedId: '',
            title: ''
        }
    }

    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    onOpenModal = (item) => {
        console.log(item)
        this.setState({ open: true, activeitem: item });
    };

    onCloseModal = () => {
        this.setState({ open: false });
        this.setState({ openStar: false });
        this.setState({ openComplaint: false });
    };

    onOpenModalStar = (item) => {
        console.log(item)
        this.setState({ openStar: true, activeitem: item });
    };

    onOpenModalComplaint = (item) => {
        console.log(item)
        this.setState({ openComplaint: true, activeitem: item });
    };

    onCloseModalPrepearing = async () => {
        this.setState({ open: false });
        await updateOrder(user._id,token,{orderItemId:this.state.activeitem.OrderId,prepearing:true})
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                var order =[]
            }
        })
    };

    onCloseModalShipped = async () => {
        this.setState({ open: false });
        await updateOrder(user._id,token,{orderItemId:this.state.activeitem.OrderId,shipped:true})
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                console.log(data)
                var order =[]
            }
        })
    };

    onClickComplaint = async () => {
        this.setState({ openComplaint: false });
    };

    handleChange(e) 
    {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleChangeSelected = (id) => {
        this.setState({ selectedId: id });
    }

    async onStarClick(nextValue, prevValue, name) {
        console.log(name,this.state.activeitem)
        const {user,token} = isAuthenticated();
        if(user==undefined){
            toast.error("You have to login!")
            return
        }   
        const response = await rateProducer(user._id,token,{"ProducerId":this.state.activeitem.Producers[name]._id,"Star":nextValue});
        if(response == undefined){ 
            toast.error('Error occured!')
        }else{
            console.log(response)
        }     
        
    }

    async onSendComplaint() {
        console.log(this.state.title,this.state.complaint,this.state.selectedId)
        const {user,token} = isAuthenticated();
        if(user==undefined){
            toast.error("You have to login!")
            return
        }   
        const response = await pushComplaint(user._id,token,{"Title":this.state.title,"Complaint":this.state.complaint,"ProducerId":this.state.selectedId,"UserId":user._id});
        if(response == undefined){ 
            toast.error('Error occured!')
        }else{
            console.log(response)
        }     
        
    }
    

    render() {
        const { pageSize, myClass, multiSelectOption, pagination } = this.props;
        const { myData } = this.state
        const columns = [];
        for (var key in myData[0]) {

            let editable = this.renderEditable
            if (key === "image") {
                editable = null;
            }
            if (key === "status") {
                editable = null;
            }
            if (key === "avtar") {
                editable = null;
            }
            if (key === "vendor") {
                editable = null;
            }
            if(key === "order_status"){
                editable = null;
            }
            if(key === "Producers"){
                continue
            }
            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    }
                });
        }

        if (multiSelectOption == true) {
            columns.push(
                {
                    Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={
                            (e) => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                    this.handleRemoveRow()
                            }}>Delete</button>,
                    id: 'delete',
                    accessor: str => "delete",
                    sortable: false,
                    style: {
                        textAlign: 'center'
                    },
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    ),
                    accessor: key,
                    style: {
                        textAlign: 'center'
                    }
                }
            )
        } else {
            if(isAuthenticated().user.role === 'Producer')
            {
                columns.push(
                    {
                        Header: <b>Edit Status</b>,
                        id: 'delete',
                        accessor: str => "delete",
                        Cell: (row) => (
                            
                            <div>
                               
                            <span onClick={()=>this.onOpenModal(myData[row.index])} data-toggle="modal" data-original-title="test" data-target="#exampleModal">
                                <i  className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i></span>
                            </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
                }
            )
            }else{
                columns.push(
                    {
                        Header: <b>Rate Producers</b>,
                        id: 'delete',
                        accessor: str => "delete",
                        Cell: (row) => (
                            
                            <div>
                                
                            <span onClick={()=>this.onOpenModalStar(myData[row.index])} data-toggle="modal" data-original-title="test" data-target="#exampleModal">
                                <i  className="fa fa-star" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(100, 200, 15)' }}></i></span>
                            </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
                })
                columns.push(
                    {
                        Header: <b>Complaint Producers</b>,
                        id: 'delete',
                        accessor: str => "delete",
                        Cell: (row) => (
                            
                            <div>
                            <span onClick={()=>this.onOpenModalComplaint(myData[row.index])} data-toggle="modal" data-original-title="test" data-target="#exampleModal">
                                <i  className="fa fa-ban" style={{ width: 35, fontSize: 20, padding: 11,color:'#e4566e' }}></i></span>
                            </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
                })
            }
            
        }

        return (
            <Fragment>
                    <Modal open={this.state.open} onClose={this.onCloseModal} >
                        
                        <div className="modal-header">
                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Update Status</h5>
                        </div>
                        {this.state.activeitem.Status==="Waiting" && ( 
                        <div>
                        <div className="modal-body">
                            <div className="col-xl-9 col-sm-8">
                                <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                    <label className="d-block" >
                                    <input className="radio_animated" value="Prepearing" id="edo-ani3" type="radio" name="rdo-ani1" defaultChecked />
                                    Preparing
                                                </label> 
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.onCloseModalPrepearing('VaryingMdo')}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                    </div>
                    </div>
                         )}
                        {this.state.activeitem.Status==="Prepearing" && (
                            <div>
                        <div className="modal-body">
                            <div className="col-xl-9 col-sm-8">
                                <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                    <div><label className="d-block">
                                        <input className="radio_animated" value="Shipped" id="edo-ani4" type="radio" name="rdo-ani1" />
                                        Shipped
                                                    </label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => this.onCloseModalShipped('VaryingMdo')}>Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                        </div>
                        </div>
                         )}
                    </Modal>
                    <Modal open={this.state.openStar} onClose={this.onCloseModal} >
                        
                        <div className="modal-header">
                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Give Rate</h5>
                        </div>
                        <div>
                        <div className="modal-body">
                            <div className="col-md-12">
                            { this.state.activeitem.Producers && this.state.activeitem.Producers.map((product, index ) => (
                                <div>
                                <h4>
                                    {product.firstName}:
                                </h4>
                                <StarRatingComponent 
                                    name={index}
                                    starCount={5}
                                    value={this.state.rate}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                                </div>))}
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                    </div>
                    </div>
                    </Modal>
                    <Modal open={this.state.openComplaint} onClose={this.onCloseModal} >
                        
                        <div className="modal-header">
                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Give Complaint</h5>
                        </div>
                        <div>
                        <div className="modal-body">
                            
                        
                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                            {this.state.activeitem.Producers && this.state.activeitem.Producers.map((product, index ) => (
                                <label className="d-block" >
                                    <input className="radio_animated" onChange={this.handleChange.bind(this)} id="edo-ani3" value={product._id} type="radio" name="selectedId" />
                                    {product.firstName}
                                                </label>
                                                
                            ))}
                            </div>
                        <textarea className="form-control" placeholder="Title" id="exampleFormControlTextarea1" rows="1" name="title" onChange={this.handleChange.bind(this)} ></textarea>
                        <textarea className="form-control" placeholder="Write Your Complaint Here" id="exampleFormControlTextarea1" rows="6" name="complaint" onChange={this.handleChange.bind(this)} ></textarea>
                            
                        <div className="modal-footer">
                        
                        <button type="button" className="btn btn-primary" onClick={() => this.onSendComplaint('VaryingMdo')}>Send</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                    </div>
                    </div>
                    </div>
                    </Modal>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable
