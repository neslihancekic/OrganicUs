import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-responsive-modal';

import {isAuthenticated} from '../../../api/auth'
import {updateOrder} from '../../../api/admin'
const{user,token} = isAuthenticated()
export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            open: false,
            activeitem: '',
            shippinginfo: ''
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

    handleChange = (info) => {
        this.setState({ shippinginfo: info });
    }

    editOrderStatus = () => {

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
                        Header: <b>Action</b>,
                        id: 'delete',
                        accessor: str => "delete",
                        Cell: (row) => (
                            
                            <div>
                                <span onClick={() => {
                                    if (window.confirm('Are you sure you wish to delete this item?')) {
                                        let data = myData;
                                        data.splice(row.index, 1);
                                        this.setState({ myData: data });
                                    }
                                    toast.success("Successfully Deleted !")
    
                                }}>
                                    {/*<i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                                    ></i>*/}
                                </span>
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
