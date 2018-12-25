import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_RECIPES, DELETE_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER,
} from '../../queries';

class UserRecipes extends Component {
  state = {};

  handleDelete = (deleteRecipe) => {
    deleteRecipe().then(() => {});
  };

  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          return (
            <div>
              <h3>You Recipes:</h3>
              {!data.getUserRecipes.length && (
                <p>
                  <strong>You have not added any recipes yet.</strong>
                </p>
              )}
              <ul>
                {data.getUserRecipes.map(recipe => (
                  <li key={recipe._id}>
                    <div className="wrapper">
                      <Link to={`/recipes/${recipe._id}`}>
                        <h4>{recipe.name}</h4>
                      </Link>
                      <Mutation
                        mutation={DELETE_RECIPE}
                        variables={{ _id: recipe._id }}
                        refetchQueries={() => [
                          { query: GET_ALL_RECIPES },
                          { query: GET_CURRENT_USER },
                        ]}
                        update={(cache, { data: { deleteRecipe } }) => {
                          const { getUserRecipes } = cache.readQuery({
                            query: GET_USER_RECIPES,
                            variables: { username },
                          });
                          cache.writeQuery({
                            query: GET_USER_RECIPES,
                            variables: { username },
                            data: {
                              getUserRecipes: getUserRecipes.filter(
                                item => item._id !== deleteRecipe._id,
                              ),
                            },
                          });
                        }}
                      >
                        {(deleteRecipe, attrs = {}) => (
                          <button
                            type="button"
                            className="delete-button"
                            style={{ marginLeft: 20 }}
                            onClick={() => this.handleDelete(deleteRecipe)}
                          >
                            {attrs.loading ? 'deleting...' : 'Delete'}
                          </button>
                        )}
                      </Mutation>
                    </div>
                    <p>{`Likes: ${recipe.likes}`}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

UserRecipes.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserRecipes;
