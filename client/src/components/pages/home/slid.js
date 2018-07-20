import React , {Component} from 'react';
import slid from './../../../images/slid.jpg';
export default class Slid extends Component{
    render() {
    const altArt = 'fdsfdfssf';
      return (
        <div className="row m-b-20">
            <div className="col-sm-12">
                <img src={slid} alt={altArt} className="slid"/>
            </div>
        </div>
      )
    }
}