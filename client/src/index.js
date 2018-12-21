import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import API_URI from './config';
import './index.css';
import App from './components/App';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import withSession from './components/withSession';

const client = new ApolloClient({
  uri: API_URI,
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
      if (networkError.statusCode === 401) {
        localStorage.removeItem('token');
      }
    }
  },
});

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RootWithSession = withSession(Root);

const app = (
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
