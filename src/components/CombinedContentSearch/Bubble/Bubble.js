import React from 'react';
import PropTypes from 'prop-types';

const Bubble = ({
  primary,
  filter,
  children
}) => {
  let bubbleContainerClasses = 'bubble-container';
  if (primary) {
    bubbleContainerClasses += ' primary';
  }

  if (filter) {
    bubbleContainerClasses += ' filter';
  }

  return (
    <li className={bubbleContainerClasses} data-testid="bubbleContainer">
      <div className="bubble">
        {children}
      </div>
    </li>
  );
};

Bubble.propTypes = {
  primary: PropTypes.bool,
  filter: PropTypes.bool,
  children: PropTypes.node
};

export default Bubble;
