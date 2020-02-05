import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from '../components/Layout';
import { Home } from '../components/Home';
import { FetchData } from '../components/FetchData';
import { Counter } from '../components/Counter';

import '../custom.css'

export default class AdminLTE extends Component {
  static displayName = AdminLTE.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />        
        </Switch>
        
      </Layout>
    );
  }
}
