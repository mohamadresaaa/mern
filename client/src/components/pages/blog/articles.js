import React , { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Articles extends Component{
    render() {
        const { article } = this.props;
      return (
        <div className="col-md-4">
            <div className="card m-b-20">
                <div className="card-body">
                    <h4 className="card-title">{article.title}</h4>
                    <Link to={`/category/${article.category.url}`} className="card-link">
                    <h6 className="card-subtitle text-muted">{article.category.title}</h6>
                    </Link>
                </div>
                <img className="img-fluid img-article" src={article.image} alt={article.title} />
                <div className="card-body">
                    <p className="card-text">{article.content.substr(0,250)}...</p>
                    <Link to={`/article/${article.url}`} className="card-link">more...</Link>
                </div>
            </div>
        </div>
      )
    }
}