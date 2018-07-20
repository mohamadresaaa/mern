import React , {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

//coponent
import NavItem from '../navItem';
//user image
import imgUser from './../../images/avatar-1.jpg';
export default class Header extends Component{
    render() {
        const { auth : isAuthenticated , logout } = this.props;

      return (
        <header id="topnav">
        <div className="topbar-main">
            <div className="container-fluid">
                <div className="logo">
                    <Link to="/" className="logo">
                        <span>Nodejs<span>And</span>Reactjs</span>
                    </Link>
                </div>

                <div className="menu-extras topbar-custom">

                    <ul className="list-unstyled topbar-right-menu float-right mb-0">

                        <li className="menu-item">
                            <a className="navbar-toggle nav-link">
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </a>
                        </li>
                        <li className="hide-phone">
                            <form className="app-search">
                                <input type="text" placeholder="Search..." className="form-control"/>
                                <button type="submit">
                                <FontAwesome name='search' />
                                </button>
                            </form>
                        </li>
                        <li className="dropdown notification-list">
                            {
                                isAuthenticated ? 
                                ( 
                                    <div>
                                        <a className="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown" href="" role="button" aria-haspopup="false" aria-expanded="false">
                                            <img src={imgUser} alt="user" className="rounded-circle"/>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                            <a href="" className="dropdown-item notify-item">
                                                <i className="ti-user m-r-5"></i> Profile
                                            </a>
                                        </div>
                                        <button className="btn btn-secondary" onClick={logout} >logOut</button>
                                    </div>
                                )
                                : 
                                (  
                                    <div className="auth">
                                        <Link to='/register' className="btn btn-secondary">Register</Link>
                                        <Link to='/login' className="btn btn-inverse btn-login">Login</Link>
                                    </div>
                                )
                            }
                        </li>
                    </ul>
                </div>

                <div className="clearfix"></div>

            </div>
        </div>

        <div className="navbar-custom">
            <div className="container-fluid">
                <div id="navigation">
                    <ul className="navigation-menu">
                        <NavItem activeOnlyWhenExact={true} to="/">Home</NavItem>
                        <NavItem to="/review">Review</NavItem>
                        <NavItem to="/blog">Blog</NavItem>
                        <NavItem to="/about">About</NavItem>
                        <NavItem to="/contact">Contact</NavItem>
                    </ul>
                </div>
            </div>
        </div>
    </header>
      )
    }
}