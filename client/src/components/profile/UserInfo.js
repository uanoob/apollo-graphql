import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const iso = new Date().toISOString(date);
  const newDate = new Date(iso).toLocaleDateString('en-US');
  const newTime = new Date(iso).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => {
  const {
    username, createdAt, email, favorites,
  } = session.getCurrentUser;
  return (
    <div className="App">
      <h3>UserInfo</h3>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Join Date: ${formatDate(createdAt)}`}</p>
      <ul>
        <h3>{`${username}'s Favorites`}</h3>
        <ul>
          {favorites.map(favorite => (
            <li key={favorite._id}>
              <Link to={`/recipes/${favorite._id}`}>
                <p>{favorite.name}</p>
              </Link>
            </li>
          ))}
          {!favorites.length && (
            <p>
              <strong>You have no favorites currently. Go add some!</strong>
            </p>
          )}
        </ul>
      </ul>
    </div>
  );
};

UserInfo.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

UserInfo.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default UserInfo;
