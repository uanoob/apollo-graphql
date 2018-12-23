import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import API_URI from './config';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import Search from './components/recipe/Search';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AddRecipe from './components/recipe/AddRecipe';
import RecipePage from './components/recipe/RecipePage';
import Profile from './components/profile/Profile';
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

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/login" render={() => <Login refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

Root.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

Root.propTypes = {
  refetch: PropTypes.func.isRequired,
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
};

const RootWithSession = withSession(Root);

const app = (
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
