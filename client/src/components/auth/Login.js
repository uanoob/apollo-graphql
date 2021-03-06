import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: '',
  password: '',
};

class Login extends Component {
  state = {
    ...initialState,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleSubmit = (e, loginUser) => {
    e.preventDefault();
    const { history, refetch } = this.props;
    loginUser().then(async ({ data }) => {
      const { token } = data.loginUser;
      localStorage.setItem('token', token);
      await refetch();
      this.clearState();
      history.push('/');
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2 className="App">Login</h2>
        <Mutation
          mutation={LOGIN_USER}
          variables={{
            username,
            password,
          }}
        >
          {(loginUser, { loading, error }) => (
            <form className="form" onSubmit={e => this.handleSubmit(e, loginUser)}>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="button-primary"
                disabled={loading || this.validateForm()}
              >
                Submit
              </button>
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(Login);
