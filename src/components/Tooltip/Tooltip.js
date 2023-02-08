import React from 'react';
import PropTypes from 'prop-types';

const ARROW_WIDTH_PX = 12;

const Tooltip = ({
  isVisible = false,
  top = 0,
  left = 0,
  children,
  close
}) => {
  const tooltipRef = React.useRef(null);
  let tooltipClasses = 'o-tooltip o-tooltip--arrow-left o-tooltip-arrow--align-middle';
  tooltipClasses += isVisible ? ' visible' : '';

  const tooltipStyles = {
    top:
      (
        tooltipRef
        && tooltipRef.current
        && tooltipRef.current.clientHeight
        && -(tooltipRef.current.clientHeight - top) / 2
      )
      || top,
    left: left + ARROW_WIDTH_PX
  };

  return (
    <div
      ref={tooltipRef}
      className={tooltipClasses}
      style={tooltipStyles}
      data-testid="tooltip"
    >
      <div className="o-tooltip-content">
        <div>{children}</div>
      </div>
      {close && <button onClick={close} className="o-tooltip-close" aria-label="Close tooltip" title="Close tooltip" />}
    </div>
  );
};

Tooltip.propTypes = {
  isVisible: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  close: PropTypes.func
};

export default Tooltip;
