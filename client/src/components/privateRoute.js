import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect , Route } from 'react-router-dom';
export default class PrivateRoute extends Component{

    static propTypes = {
        component : PropTypes.func.isRequired,
        path : PropTypes.string.isRequired
    };

    render() {
        const { component : Component , auth : isAuthonticated , ...restProps } = this.props;
      return <Route {...restProps} render={(props) => (
        isAuthonticated ?
           (<Component {...props} />)
            :
           (<Redirect to={{ pathname : '/login' , state : { from : props.location } }} />)
      )} />
    }
}