import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeItem = ({
  _id, name, imageUrl, category,
}) => (
  <li className="card" style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}>
    <span className={category}>{category}</span>
    <div className="card-text">
      <Link to={`/recipes/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </li>
);

RecipeItem.propTypes = {
  _id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default RecipeItem;
