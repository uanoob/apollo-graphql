import React from 'react';
import { PropTypes } from 'prop-types';

const Error = (props) => {
  const { error } = props;
  return <p>{error.message}</p>;
};

Error.defaultProps = {
  error: null,
};

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

export default Error;
