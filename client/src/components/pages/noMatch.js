import React , { Component } from 'react';

export default class NoMatch extends Component{
    render() {
      return (
        <div className="ex-page-content text-center">
            <div className="text-error">404</div>
            <h3 className="text-uppercase font-600">Page not Found</h3>
            <p className="text-muted">
            The requested URL was not found on this server. That’s all we know.
            </p>
        </div>
      )
    }
}