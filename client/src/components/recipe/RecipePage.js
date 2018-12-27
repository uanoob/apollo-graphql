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
          name,
          imageUrl,
          category,
          description,
          instructions,
          likes,
          username,
        } = data.getRecipe;
        return (
          <div className="App ">
            <div
              className="recipe-image"
              style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
            />
            <div className="recipe">
              <h4 className="recipe-header">{name}</h4>
              <p>{category}</p>
              <blockquote className="recipe-description">{description}</blockquote>
              <h3 className="recipe-instructions__title">Instructions:</h3>
              <div
                className="recipe-instructions"
                dangerouslySetInnerHTML={{ __html: instructions }}
              />
              <p>{likes}</p>
              <p>{`Created By: ${username}`}</p>
              <LikeRecipe _id={_id} />
            </div>
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
