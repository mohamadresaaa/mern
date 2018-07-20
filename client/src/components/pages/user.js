import React , { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

export default class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user : {}
        }
    }
    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`http://localhost:8000/api/v1/users/${params.email}`)
        .then(res=>{
            const { data } = res.data;
            this.setState({
                user : data
            })
        })
        .catch(err=>console.log(err));
    }
    render() {
        const { user } = this.state;
      return (
        <div className="row user-profile">
            <div className="col-sm-12">
                <div className="bg-picture card-box">
                    <div className="profile-info-name">
                        <img src={user.photo} className="img-thumbnail" alt={user.name+' '+user.family}/>
                        <div className="profile-info-detail">
                            <h4 className="m-0">{user.name+' '+user.family}</h4>
                            <p className="text-muted m-b-20"><i>{user.job}</i></p>
                            <p>{user.bio}</p>
                            <div className="button-list m-t-20">
                                {user.linkedin ? <a href={`https://linkedin.com/${user.linkedin}`} className="btn btn-purple">
                                    <FontAwesome name='linkedin-square'/> linkedin
                                </a> : null}
                                {user.github ? <a href={`https://github.com/${user.github}`} className="btn btn-inverse">
                                    <FontAwesome name='github-square'/> Github
                                </a> : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    }
}