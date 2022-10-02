import React from "react";
import { animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import parse from "html-react-parser";
import useWindowDimensions from "../hooks/useWindowDimensions";
import useContainerDimensions from "../hooks/useContainerDimensions";

const DraggableComponent = ({
  data,
  id,
  query,
  position,
  index,
  updateElementPosition,
  controlClosed,
  highlightedElement,
}) => {
  const [divPos, setDivPos] = React.useState(position);
  const windowSize = useWindowDimensions(controlClosed);
  const containerSize = useContainerDimensions(`container ${index}`);

  React.useEffect(() => {
    setDivPos(position);
  }, [position]);

  const bindDivPos = useDrag((params) => {
    var left = params.offset[0];
    var top = params.offset[1];

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

    updateElementPosition(index, { left, top });
    setDivPos({ left, top });
  });

  return (
    <animated.div
      {...bindDivPos()}
      style={{
        cursor: "grab",
        position: "absolute",
        left: divPos.left,
        top: divPos.top,
        touchAction: "none",
        opacity: highlightedElement === index ? "0.5" : "1",
      }}
      id={`container ${index.toString()}`}
    >
      {parse(data)}
    </animated.div>
  );
};

export default DraggableComponent;
