import React , { Component } from 'react';
import axios from 'axios';
//component
import Slid from './home/slid';
import LastArticles from './home/lastArticles';
import Review from './home/review';

export default class Home extends Component{
  constructor(props){

    super(props);
    this.state = {
      articles : []
    }

  }
  
  componentDidMount(){
    axios.get('http://localhost:8000/api/v1/lastArticle')
          .then(res =>{
            const { data } = res.data;
            this.setState({
              articles : data
            })
          })
          .catch(err =>{
            console.log(err);
          })
  }
    render() {
      return (
        <div>
            <Slid/>
            <div className="row m-b-20">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3 className="custom-title">Last Articles</h3>
              </div>
            {this.state.articles.map((article,index) => <LastArticles article={article} key={index} />)}
            </div>
            <Review/>
        </div>
      )
    }
}