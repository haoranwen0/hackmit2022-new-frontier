import React from "react";
import useContainerDimensions from "./useContainerDimensions";

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });
  const containerSize = useContainerDimensions("tool-container");

  React.useEffect(() => {
    undateWindowDimensions();
    window.addEventListener("resize", undateWindowDimensions);
    return () => {
      window.removeEventListener("resize", undateWindowDimensions);
    };
    //eslint-disable-next-line
  }, [containerSize]);

  const undateWindowDimensions = () => {
    setWindowSize({
      width: window.innerWidth - containerSize.width,
      height: window.innerHeight,
    });
  };

  return windowSize;
}
