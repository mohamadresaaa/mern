import React , { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Categoires extends Component{
    render() {
        const { category } = this.props;
      return (
        <li className="list-group-item">
            <Link to={`/category/${category.url}`} className="user-list-item">
                <div className="user-desc">
                    <span className="name">{category.title}</span>
                </div>
            </Link>
        </li>
      )
    }
}