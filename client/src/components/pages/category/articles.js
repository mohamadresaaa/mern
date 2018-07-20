import React , { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Articles extends Component{
    render() {
    const { article } = this.props;
      return (
        <div className="col-md-6 col-lg-3">
            <div class="card m-b-20">
                <img class="card-img-top img-fluid img-article" src={article.image} alt={article.title}/>
                <div class="card-body">
                <h4 class="card-title">{article.title}</h4>
                    <p class="card-text">{article.content.substr(0,250)}...</p>
                    <Link to={`/article/${article.url}`} className="btn btn-primary">more...</Link>
                </div>
            </div>
        </div>
      )
    }
}