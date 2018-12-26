import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error</div>;
        }
        const {
          name, category, description, instructions, likes, username,
        } = data.getRecipe;
        return (
          <div className="App ">
            <h4>{name}</h4>
            <p>{category}</p>
            <p>{description}</p>
            <p>{instructions}</p>
            <p>{likes}</p>
            <p>{`Created By: ${username}`}</p>
            <LikeRecipe _id={_id} />
          </div>
        );
      }}
    </Query>
  );
};

RecipePage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(RecipePage);
