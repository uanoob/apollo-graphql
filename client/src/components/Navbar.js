import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import stringToChar from '../utils/stringToChar.utils';
import Logout from './auth/Logout';

const NavbarNotAuth = () => (
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/login">Login</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/recipe/add">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <div className="avatar">{stringToChar(session.getCurrentUser.username)}</div>
      </li>
    </ul>
  </Fragment>
);

NavbarAuth.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

NavbarAuth.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
};

const Navbar = ({ session }) => (
  <nav>{session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarNotAuth />}</nav>
);

Navbar.defaultProps = {
  session: PropTypes.shape({
    getCurrentUser: null,
  }),
};

Navbar.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default Navbar;
