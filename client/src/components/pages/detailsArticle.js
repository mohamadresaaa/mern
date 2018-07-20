import React , { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Article extends Component{

    constructor(props) {
        super(props);
        this.state = {
            article : {},
            author : {},
            category : {},
            comments : []
        }
    }

    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`http://localhost:8000/api/v1/articles/${params.url}`)
            .then(res =>{
                const { data } = res.data;
                this.setState({
                    article : data,
                    author : data.author,
                    category : data.category,
                    comments : data.comments
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
    const { article , author , category , comments } = this.state;
      return (
            <div className="row article-details">
                <div className="col-md-8">
                        <div className="card-box task-detail">
                            <div className="media m-b-30">
                                <img className="d-flex mr-3 rounded-circle" alt="64x64" src={author.photo} style={{width: 48, height: 48}}/>
                                <div className="media-body">
                                    <Link to={`/user/${author.email}`}>
                                        <h3 className="media-heading mb-0 mt-0">{author.name +' '+author.family}</h3>
                                    </Link>
                                    <h5 className="badge badge-danger">Job</h5>
                                </div>
                            </div>

                            <h2 className="font-600 m-b-20">{article.title}</h2>
                            {article.content}
                            <ul className="list-inline task-dates m-b-0 m-t-20">
                                <li>
                                    <h5 className="font-600 m-b-5"><FontAwesome name='clock-o'/> Release</h5>
                                    <p>{article.show_date}</p>
                                </li>
                                <li>
                                    <h5 className="font-600 m-b-5"><FontAwesome name='list-ul'/> Categories</h5>
                                    <p><Link to={`/category/${category.url}`}>{category.title}</Link></p>
                                </li>
                            </ul>
                            <div className="clearfix"></div>
                            {/* <div className="attached-files m-t-30">
                                <h5 className="font-600">Attached Files </h5>
                                <div className="files-list">
                                    <div className="file-box">
                                        <a href=""><img src="assets/images/attached-files/img-1.jpg" className="img-responsive img-thumbnail" alt="attached-img"/></a>
                                        <p className="font-13 m-b-5 text-muted"><small>File one</small></p>
                                    </div>
                                    <div className="file-box">
                                        <a href=""><img src="assets/images/attached-files/img-2.jpg" className="img-responsive img-thumbnail" alt="attached-img"/></a>
                                        <p className="font-13 m-b-5 text-muted"><small>Attached-2</small></p>
                                    </div>
                                    <div className="file-box">
                                        <a href=""><img src="assets/images/attached-files/img-3.png" className="img-responsive img-thumbnail" alt="attached-img"/></a>
                                        <p className="font-13 m-b-5 text-muted"><small>Dribbble shot</small></p>
                                    </div>
                                    <div className="file-box m-l-15">
                                        <div className="fileupload add-new-plus">
                                            <span><i className="mdi-plus mdi"></i></span>
                                            <input className="upload" wtx-context="047B1420-2775-4B43-82B7-5D36A0898BBF" type="file"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="text-right m-t-30">
                                            <button type="submit" className="btn btn-success waves-effect waves-light">
                                                Save
                                            </button>
                                            <button type="button" className="btn btn-light waves-effect">Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                </div>

                <div className="col-md-4">
                        <div className="card-box">
                            <h4 className="header-title m-t-0 m-b-30">Comments</h4>
                            <div>
                                <div className="media m-b-20">
                                    <div className="d-flex mr-3">
                                        <a href=""> <img className="media-object rounded-circle thumb-sm" alt="64x64" src="assets/images/users/avatar-1.jpg"/> </a>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mt-0">Mat Helme</h5>
                                        <p className="font-13 text-muted mb-0">
                                            <a href="" className="text-primary">@Michael</a>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin commodo. Cras purus odio.
                                        </p>
                                        <a href="" className="text-success font-13">Reply</a>
                                    </div>
                                </div>

                                <div className="media m-b-20">
                                    <div className="d-flex mr-3">
                                        <a href=""> <img className="media-object rounded-circle thumb-sm" alt="64x64" src="assets/images/users/avatar-2.jpg"/> </a>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mt-0">Media heading</h5>
                                        <p className="font-13 text-muted mb-0">
                                            <a href="" className="text-primary">@Michael</a>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin commodo. Cras purus odio.
                                        </p>
                                        <a href="" className="text-success font-13">Reply</a>

                                        <div className="media m-t-20 m-b-20">
                                            <div className="d-flex mr-3">
                                                <a href=""> <img className="media-object rounded-circle thumb-sm" alt="64x64" src="assets/images/users/avatar-3.jpg"/> </a>
                                            </div>
                                            <div className="media-body">
                                                <h5 className="mt-0">Nested media heading</h5>
                                                <p className="font-13 text-muted mb-0">
                                                    <a href="" className="text-primary">@Michael</a>
                                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                                    ante sollicitudin commodo. Cras purus odio.
                                                </p>
                                                <a href="" className="text-success font-13">Reply</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="media m-b-20">
                                    <div className="d-flex mr-3">
                                        <a href=""> <img className="media-object rounded-circle thumb-sm" alt="64x64" src="assets/images/users/avatar-1.jpg"/> </a>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mt-0">Mat Helme</h5>
                                        <p className="font-13 text-muted mb-0">
                                            <a href="" className="text-primary">@Michael</a>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin commodo. Cras purus odio.
                                        </p>
                                        <a href="" className="text-success font-13">Reply</a>
                                    </div>
                                </div>

                                <div className="media m-b-20">
                                    <div className="d-flex mr-3">
                                        <a href=""> <img className="media-object rounded-circle thumb-sm" alt="64x64" src="assets/images/users/avatar-1.jpg"/> </a>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mt-0">Mat Helme</h5>
                                        <p className="font-13 text-muted mb-0">
                                            <a href="" className="text-primary">@Michael</a>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin commodo. Cras purus odio.
                                        </p>
                                        <a href="" className="text-success font-13">Reply</a>
                                    </div>
                                </div>

                                <div className="media m-b-20">
                                    <div className="media-body">
                                        <form method="post" className="">
                                            <span className="input-icon icon-right">
                                                <textarea rows="2" className="form-control" placeholder="new comment"></textarea>
                                            </span>
                                            <div className="p-t-10 pull-right">
                                                <a className="btn btn-sm btn-primary waves-effect waves-light">Send</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
      )
    }
}