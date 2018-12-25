import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries';

const UserRecipes = ({ username }) => (
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
          <ul>
            {data.getUserRecipes.map(recipe => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <h4>{recipe.name}</h4>
                </Link>
                <p>{`Likes: ${recipe.likes}`}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

UserRecipes.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserRecipes;
