import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Mutation } from 'react-apollo';
import withSession from '../withSession';
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from '../../queries';

class LikeRecipe extends Component {
  state = {
    username: '',
    liked: false,
  };

  componentDidMount() {
    const { session } = this.props;
    if (session.getCurrentUser) {
      const { username, favorites } = session.getCurrentUser;
      const { _id } = this.state;
      const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        username,
        liked: prevLiked,
      });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    const { liked } = this.state;
    this.setState(
      {
        liked: !liked,
      },
      () => this.handleLike(likeRecipe, unlikeRecipe),
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    const { refetch } = this.props;
    const { liked } = this.state;
    if (liked) {
      likeRecipe().then(async (data) => {
        console.log(data);
        await refetch();
      });
    } else {
      unlikeRecipe().then(async (data) => {
        console.log(data);
        await refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
      },
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
      },
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    return (
      <Mutation mutation={UNLIKE_RECIPE} variables={{ _id, username }} update={this.updateUnlike}>
        {unlikeRecipe => (
          <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }} update={this.updateLike}>
            {likeRecipe => username && (
            <button type="button" onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
              {liked ? 'Unlike' : 'Like'}
            </button>
            )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

LikeRecipe.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

LikeRecipe.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
  refetch: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

export default withSession(LikeRecipe);
