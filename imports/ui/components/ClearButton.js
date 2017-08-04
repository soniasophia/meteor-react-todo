import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = ({ removeCompleted }) => (
  <button onClick={removeCompleted}>Clear Completed</button>
);

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
}

export default ClearButton;