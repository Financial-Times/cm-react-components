import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../Tooltip/Tooltip';

import { useTooltip } from '../../../utils/hooks/useTooltip';

const Hint = ({
  className: additionalClassName,
  children
}) => {
  const tooltipContainerRef = useRef(null);
  const elementRef = useRef(null);
  const {
    isVisible,
    hideTooltip,
    showTooltip,
    top,
    left
  } = useTooltip(false, tooltipContainerRef, elementRef);

  const handleClickOutside = event => {
    if (
      tooltipContainerRef
      && tooltipContainerRef.current
      && !tooltipContainerRef.current.contains(event.target)
    ) {
      hideTooltip();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  let containerClasses = 'with-tooltip';

  if (additionalClassName) {
    containerClasses += ` ${additionalClassName}`;
  }

  return (
    <div className={containerClasses} ref={tooltipContainerRef} data-testid="hint">
      <button
        ref={elementRef}
        className="as-icon hint"
        title="Hint"
        onClick={showTooltip}
      />
      <Tooltip
        isVisible={isVisible}
        top={top}
        left={left}
        close={hideTooltip}
      >
        {children}
      </Tooltip>
    </div>
  );
};

Hint.propTypes = {
  className: PropTypes.string,
  children: Tooltip.propTypes.children
};

export default Hint;
