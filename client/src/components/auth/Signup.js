import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
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

  handleSubmit = (e, signupUser) => {
    e.preventDefault();
    const { history, refetch } = this.props;
    signupUser().then(async ({ data }) => {
      const { token } = data.signupUser;
      localStorage.setItem('token', token);
      await refetch();
      this.clearState();
      history.push('/');
    });
  };

  validateForm = () => {
    const {
      username, email, password, passwordConfirmation,
    } = this.state;
    const isInvalid = !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const {
      username, email, password, passwordConfirmation,
    } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{
            username,
            email,
            password,
          }}
        >
          {(signupUser, { data, loading, error }) => (
            <form className="form" onSubmit={e => this.handleSubmit(e, signupUser)}>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={this.handleChange}
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                placeholder="Confirm Password"
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

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(Signup);
