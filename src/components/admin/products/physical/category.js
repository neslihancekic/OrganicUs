import React, { Component, Fragment, useState} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import data from '../../../../assets/admin/data/category';
import Datatable from '../../common/datatable';

import {isAuthenticated} from '../../../../api/auth';
import {createCategory, listCategory} from '../../../../api/admin';

export class Category extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            open: false,
            name:'',
            error:'',
            items: []
        };
    }


    componentDidMount() {
        listCategory()
        .then(data => {
            if(data.err){ 
                toast.error('Error occured!')
            }else{
                this.setState({
                    items: data.data
                });
            }
        })
    }

    onOpenModal = () => {
        console.log(this.state.data )
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    clickSubmit = () => {
        const {user,token} = isAuthenticated()
        this.onCloseModal('VaryingMdo')
        this.setState({error : ''})
        this.setState({success: false})
        createCategory(user._id,token,{name:this.state.name})
        .then(data => {
            if(data.err){ 
                this.setState({error : data.err})
                toast.error('Error occured!')
            }else{
                this.setState({error: ''})
                toast.success('Category is created')
            }
        })
    }

    handleChange = (e) => {
        
        this.setState({error : ''})
        this.setState({name: e.target.value})
        
    }

    render() {
        const { open,name,items} = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Physical" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Products Category</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">

                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Category</button>
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Category</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Category Name :</label>
                                                        <input type="text" className="form-control" value={name} onChange={this.handleChange} />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={this.clickSubmit}>Save</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                    {items.length ? (
                                            <Datatable
                                            multiSelectOption={false}
                                            myData={items} 
                                            pageSize={10} 
                                            pagination={true}
                                            class="-striped -highlight" 
                                        />
                                        ) :( "No Category!"
                                    )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>
        )
    }
}

export default Category

