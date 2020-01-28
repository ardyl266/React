import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  Login  from './LoginPage/NewLogin';
import  { Signup }   from './LoginPage/Signup';
// import   Signup    from './LoginPage/Signup';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Weather } from './Page/Weather'

import {BrowserRouter as Router} from "react-router-dom";


// import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      [
        <Route exact path='/' component={Login} />,
        <Route path='/signup' component={Signup} />
      ]
     
    );
  }
}

