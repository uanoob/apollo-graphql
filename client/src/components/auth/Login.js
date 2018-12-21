import React, { Component } from 'react';
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
    loginUser().then((data) => {
      console.log(data);
    });
    this.clearState();
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
          {(loginUser, { data, loading, error }) => (
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

export default Login;
