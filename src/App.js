import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import './App.css';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import { connect } from 'react-redux';
class App extends Component {

  render () {
    let routes = (
      <Switch>
        <Route exact path="/" render={()=><Redirect to="/auth"/>} />
        <Route path="/auth" component={Auth} />
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
      </Switch>
    );

     if(!this.props.isAuthenticated) {
    
     }

    let currentLayout = routes;
    if(this.props.location.pathname !=='/' && this.props.location.pathname !=='/auth'){
      currentLayout = (
        <Layout>
        {routes}
        </Layout>
      )
    }

    return (
      
      <div>
        {currentLayout}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps,null)(App));
