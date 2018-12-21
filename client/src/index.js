import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import API_URI from './config';
import './index.css';
import App from './components/App';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const client = new ApolloClient({
  uri: API_URI,
});

const app = (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
