import React , { Component } from 'react';
import imgReview from './../../../images/Review-of-technology-day-issues.jpg';
export default class Review extends Component{
    render() {
    const altArt = 'fdsfdfssf';
      return (
        <div className="row m-b-20">
            <div className="col-md-4">
                <div className="card m-b-20 card-inverse text-white">
                    <img className="card-img img-fluid" src={imgReview} alt={altArt}/>
                    <div className="card-img-overlay">
                        <h4 className="card-title text-white">Card title</h4>
                        <p className="card-text">This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a little bit
                        longer.</p>
                        <p className="card-text">
                        <small className="">Last updated 3 mins ago</small>
                        </p>
                    </div>
                </div>
            </div>
        <div className="col-sm-8">
          <div className="card m-b-20 card-body">
            <h4 className="card-title">Special title treatment</h4>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa 
              qui officia deserunt mollit anim id est laborum.
            </p>
            <a href="" className="btn btn-primary">Go somewhere</a>
          </div>
          <div className="card m-b-20 card-body">
            <h4 className="card-title">Special title treatment</h4>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa 
              qui officia deserunt mollit anim id est laborum.
            </p>
            <a href="" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      )
    }
}