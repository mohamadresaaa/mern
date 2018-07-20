import React , { Component } from 'react';
import { Route , Link } from 'react-router-dom';

export default class NavItem extends Component{
    render() {
        const { to , activeOnlyWhenExact , children } = this.props;
        return (
            <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
                <li className={['has-submenu' , match ? 'active' : ''].join(' ')}>
                    <Link to={to}>
                        <span>
                            {children}
                        </span>
                    </Link>
                </li>
            )}/>
        );
    }
}