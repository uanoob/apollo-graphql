import React from 'react';
import { PropTypes } from 'prop-types';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../withAuth';

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserRecipes username={session.getCurrentUser.username} />
  </div>
);

Profile.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

Profile.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
