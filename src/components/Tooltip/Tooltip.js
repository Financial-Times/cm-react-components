import React from 'react';
import PropTypes from 'prop-types';

const ARROW_WIDTH_PX = 12;

// 1. `Tooltip` should be used with parent container with class `with-tooltip`
//    and `parentContainerRef` should be passed to `useTooltip` hook
//    in order to be correctly vertical positioned, e.g:
//    <div ref={parentContainerRef} className="with-tooltip">
//      <button ref={elementRef} onClick={clickHandler}>Tooltip</Button>
//      <Tooltip />
//    </div>
// 2. `elementRef` (see example above) should be passed to `useTooltip` hook
//    in order Tooltip to be correctly horizontal positioned
// 3. If the "tooltiped" element (`button` in the example above) is a react component
//    then it should be transformed to forwardRef (see Button.jsx)
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
