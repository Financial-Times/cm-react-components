import { useEffect, useState } from 'react';

export const useTooltip = (initialState = false, containerRef = {}, elementRef = {}) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [topPosition, setTopPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);

  useEffect(() => {
    if (containerRef && containerRef.current && containerRef.current.clientHeight) {
      setTopPosition(containerRef.current.clientHeight);
    }

    if (elementRef && elementRef.current && elementRef.current.clientWidth) {
      setLeftPosition(elementRef.current.clientWidth);
    }
  }, [isVisible, containerRef, elementRef]);

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const showTooltip = () => {
    setIsVisible(true);
  };

  return {
    isVisible,
    hideTooltip,
    showTooltip,
    top: topPosition,
    left: leftPosition
  };
};
