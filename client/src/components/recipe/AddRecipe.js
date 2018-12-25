import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';
import Error from '../Error';
import withAuth from '../withAuth';

const initialState = {
  name: '',
  category: 'Breakfast',
  description: '',
  instructions: '',
  username: '',
};

class AddRecipe extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    const { session } = this.props;
    if (session.getCurrentUser) {
      const { username } = session.getCurrentUser;
      this.setState({
        username,
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleSubmit = (e, addRecipe) => {
    e.preventDefault();
    const { history } = this.props;
    addRecipe().then(() => {
      this.clearState();
      history.push('/');
    });
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };

  validateForm = () => {
    const { name, description, instructions } = this.state;
    const isInvalid = !name || !description || !instructions;
    return isInvalid;
  };

  render() {
    const {
      name, category, description, instructions, username,
    } = this.state;
    return (
      <div className="App">
        <Mutation
          mutation={ADD_RECIPE}
          variables={{
            name,
            description,
            category,
            instructions,
            username,
          }}
          update={this.updateCache}
        >
          {(addRecipe, { loading, error }) => (
            <form className="form" onSubmit={e => this.handleSubmit(e, addRecipe)}>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Recipe name"
                onChange={this.handleChange}
              />
              <select name="category" value={category} onChange={this.handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
              <input
                type="text"
                name="description"
                value={description}
                placeholder="Add description"
                onChange={this.handleChange}
              />
              <textarea
                type="text"
                name="instructions"
                value={instructions}
                placeholder="Add instructions"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                // className="button-primary"
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

AddRecipe.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

AddRecipe.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withAuth(session => session && session.getCurrentUser)(AddRecipe));
