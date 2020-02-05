import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

// import { Login } from './LoginPage/NewLogin';
import  Login  from './LoginPage/NewLogin';
import AdminLTE from './Shared/AdminLTE';
import  {LoginLayout}  from './LoginPage/LoginLayout';
import  { Signup }   from './LoginPage/Signup';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';

import { Counter } from './components/Counter';
import { Weather } from './Page/Weather'
// import AppRoute from './AppRoute';

import {Switch, Redirect} from "react-router-dom";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      // [
      //   <Route exact path='/' component={ Login } />,
      //   <Route path='/signup' component={ Signup } />,
      //   <Route path='/fetch' component={FetchData} />
      // ]

      <Switch>
          {/* <Route exact path="/">  
             
          </Route>   */}
          <LoginLayout exact path="/" component={Login} />  
          <LoginLayout exact path="/signup" component={Signup} />  
          <LoginLayout path="/fetch" component={FetchData} />
          <AdminLTE path="/home" component={Home} />
          <AdminLTE path="/counter" component={Counter} />
          <AdminLTE path="/fetch-data" component={FetchData} />
          

         {/* <Route exact path='/' component={ Login } layout={ Login } />,
         <Route path='/signup' component={ Signup } layout={ Signup } />,
         <Route path='/fetch' component={FetchData} layout={ Layout } />
         <Route path='/fetch-data' component={Layout} layout={ Layout } />
         <Route path='/counter' component={Counter} layout={ Layout } />
         <Route path='/home' component={Home} layout={ Layout } /> */}
        
      </Switch>
        
      
     
    );
  }
}

