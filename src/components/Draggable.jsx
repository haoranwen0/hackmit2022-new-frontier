import React from "react";
import { animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import parse from "html-react-parser";
import useWindowDimensions from "../hooks/useWindowDimensions";
import useContainerDimensions from "../hooks/useContainerDimensions";

const Draggable = ({ element, index }) => {
  const [divPos, setDivPos] = React.useState({ left: 0, top: 0 });
  const windowSize = useWindowDimensions();
  const containerSize = useContainerDimensions(`container ${index}`);

  React.useEffect(() => {
    console.log(windowSize);
  }, [windowSize]);

  const bindDivPos = useDrag((params) => {
    var left = params.offset[0];
    var top = params.offset[1];

    console.log({
      top,
      left: left + containerSize.width,
    });

    if (left < 0) {
      left = 0;
    } else if (left + containerSize.width > windowSize.width) {
      left = windowSize.width - containerSize.width;
    }

    if (top < 0) {
      top = 0;
    } else if (top + containerSize.height > windowSize.height) {
      top = windowSize.height - containerSize.height;
    }

    setDivPos({ left: left, top: top });
  });

  return (
    <animated.div
      {...bindDivPos()}
      style={{
        cursor: "grab",
        position: "absolute",
        left: divPos.left,
        top: divPos.top,
      }}
      id={`container ${index.toString()}`}
    >
      {parse(element)}
    </animated.div>
  );
};

export default Draggable;
