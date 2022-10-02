import React from "react";

export default function useContainerDimensions(containerId) {
  const [containerSize, setContainerSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    updateContainerDimensions();
    window.addEventListener("resize", updateContainerDimensions);
    return () => {
      window.removeEventListener("resize", updateContainerDimensions);
    };
    //eslint-disable-next-line
  }, []);

  const updateContainerDimensions = () => {
    setContainerSize({
      width: document.getElementById(containerId).clientWidth,
      height: document.getElementById(containerId).clientHeight,
    });
  };

  return containerSize;
}
