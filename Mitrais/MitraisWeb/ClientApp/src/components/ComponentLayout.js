import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';


import '../custom.css';

export class ComponentLayout extends Component {
  static displayName = ComponentLayout.name;

  render () {
    return (
      <Layout>
        <Route path='/home' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />        
      </Layout>
    );
  }
}
