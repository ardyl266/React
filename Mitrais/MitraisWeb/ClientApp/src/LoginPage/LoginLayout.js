import React, { Component } from 'react';
import { Container } from 'reactstrap';
// import { Login } from './LoginPage/NewLogin';
import  Login  from './NewLogin';
import  { Signup }  from './Signup';
import  { FetchData }  from '../components/FetchData';
import { Route, Switch } from 'react-router';


export class LoginLayout extends Component {
  static displayName = LoginLayout.name;

  render () {
    return(
        <Switch>
          <Route exact path='/' component={ Login } />,
          <Route path='/signup' component={ Signup } />,
          <Route path='/fetch' component={FetchData} />,
        </Switch>
        
    );
  }
}
