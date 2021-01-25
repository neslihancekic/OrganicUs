import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import { listComment,pushComment } from '../../../api/product';
import { isAuthenticated } from '../../../api/auth';

class DetailsTopTabs extends Component {
    constructor() {
        super();
        this.state = {
            comments:[],
            Comment:""
        };
    }

    async componentDidMount(){
        console.log(this.props.item)
        const response = await listComment(this.props.item._id);
        if(response == undefined){ 
            toast.error('Error occured!')
        }else{
            console.log(response)
            this.setState({comments:response})
        }

    }

    handleChange(e) 
    {
        this.setState({ [e.target.name] : e.target.value });
    }
    async clickSubmit() {
        const{user,token}=isAuthenticated();
        const response = await pushComment(user._id,token,{"UserId":user._id,"ProductId":this.props.item._id,"Comment":this.state.Comment},this.props.item._id);
        if(response == undefined){ 
            toast.error('Error occured!')
        }else{
            console.log(response)
        }
    }

    render (){

        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Comments</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Write Comment</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            
                            <TabPanel>
                            <section className="blog-detail-page section-b-space">
                                <div className="container">
                                    <div className="row section-b-space">
                                        <div className="col-sm-12">
                                            <ul className="comment-section">
                                                {this.state.comments.map((comment, index) =>
                                                    <li key={index}>
                                                        <div className="media">
                                                            <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="Generic placeholder image" />
                                                                <div className="media-body">
                                                                    <h6>{comment.UserId.firstName} {comment.UserId.lastName} <span>( {comment.createdAt})</span></h6>
                                                                    <p>{comment.Comment}</p>
                                                                </div>
                                                        </div>
                                                    </li>
                                                )}
                                                {this.state.comments.length===0 && 
                                                <div className="media-body">
                                                                    <h6>There are no comments yet!</h6>
                                                                    
                                                                </div>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            </TabPanel>
                            <TabPanel>
                                <form className="theme-form mt-4">
                                    <div className="form-row">
                                        <div className="col-md-12 ">
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Comment</label>
                                            <textarea className="form-control" placeholder="Write Your Comment Here" id="exampleFormControlTextarea1" rows="6" name="Comment" onChange={this.handleChange.bind(this)} ></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit" onClick={this.clickSubmit.bind(this)}>Submit Your Comment</button>
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;