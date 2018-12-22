import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const handleLogout = (client, history) => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push('/');
};

const Logout = ({ history }) => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => handleLogout(client, history)}>
        Logout
      </button>
    )}
  </ApolloConsumer>
);

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Logout);
