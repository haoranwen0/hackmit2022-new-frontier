import React from "react";
import { API } from "aws-amplify";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";
import { ProgressBar } from "react-loader-spinner";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uniqid from "uniqid";
import useLocalStorage from "../hooks/useLocalStorage";
import download from "../functions/download";

import DraggableComponent from "../components/DraggableComponent";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: "0.5rem",
  marginBottom: "0.5rem",
  background: isDragging ? "#fef3c7" : "#f1f5f9",
  borderRadius: "0.375rem",
  border: "1px solid #e2e8f0",
  display: "flex",
  justifyContent: "space-between",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  width: "100%",
});

const Main = () => {
  const [createMenuIsOpen, setCreateMenuIsOpen] = React.useState(false);
  const [settingMenuIsOpen, setSettingMenuIsOpen] = React.useState(false);
  const [question, updateQuestion] = React.useState("");
  const [apiKey, updateApiKey] = useLocalStorage("api-key", "");
  const [elements, updateElements] = React.useState([]);
  const [controlPressed, setControlPressed] = React.useState(false);
  const [loading, updateLoading] = React.useState(false);
  const [controlClosed, setControlClosed] = React.useState(false);
  const [randomness, setRandomness] = React.useState(30);
  const [highlightedElement, setHighlightedElement] = React.useState(null);

  React.useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setCreateMenuIsOpen(false);
        setSettingMenuIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Control") setControlPressed(true);
    if (e.key === "Enter" && controlPressed) onCreate();
  };

  const onCreate = async () => {
    if (apiKey.trim() === "") {
      alert("Missing API Key");
      return;
    }
    updateLoading((prevState) => !prevState);
    if (
      question.toLowerCase().includes("image") ||
      question.toLowerCase().includes("photo") ||
      question.toLowerCase().includes("picture")
    ) {
      try {
        const res = await API.get("api", "/openai", {
          queryStringParameters: {
            question,
          },
        });
        console.log(res);
        var image = `<img src=${res.data.output_url} style="border-radius: 8px; user-select: none; object-fit: contain; width: 350px;" />`;
        console.log(image);
        updateElements((prevState) => [
          ...prevState,
          {
            id: uniqid(),
            query: question,
            data: image,
            position: {
              top: 0,
              left: 0,
            },
          },
        ]);
        // console.log(res);
        // const res =
        //   "https://api.deepai.org/job-view-file/9ce06ce3-f995-41df-8f67-ad11d6572da4/outputs/output.jpg";
        // var canvas = document.getElementById("mycanvas");
        // const context = canvas.getContext("2d");
        // var image = new Image();
        // image.src = res;
        // image.onload = function () {
        //   context.drawImage(image, 0, 0, 256, 256, 0, 0, 256, 256);
        // };
        // console.log(canvas.outerHTML);
        // console.log(canvas.innerHTL);
      } catch (e) {
        console.log(e);
      }
      updateLoading((prevState) => !prevState);
      setCreateMenuIsOpen(false);
      return;
    }
    const res = await API.get("api", "/openai", {
      queryStringParameters: {
        apiKey,
        question,
        temperature: randomness / 100,
      },
    });
    console.log(res);
    updateElements((prevState) => [
      ...prevState,
      {
        id: uniqid(),
        query: question,
        data: res.data,
        position: {
          top: 0,
          left: 0,
        },
      },
    ]);
    updateLoading((prevState) => !prevState);
    setCreateMenuIsOpen(false);
    updateQuestion("");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(
      elements,
      result.source.index,
      result.destination.index
    );
    updateElements(items);
  };

  const updateElementPosition = (index, position) => {
    var items = Array.from(elements);
    items[index].position = position;
    updateElements(items);
  };

  const removeElement = (index) => {
    var items = Array.from(elements);
    items.splice(index, 1);
    updateElements(items);
  };

  return (
    <div className="w-full h-screen relative flex">
      {controlClosed && (
        <div
          className="grid place-items-center absolute cursor-pointer bottom-6 left-4 z-10"
          onClick={() => setControlClosed(false)}
        >
          <div className="grid place-items-center hover:text-sky-600 transition-all">
            <KeyboardDoubleArrowRightIcon />
          </div>
        </div>
      )}
      <div
        className={`w-80 h-full border-slate-200 border-r-[1px] bg-slate-50 py-4 overflow-auto ${
          controlClosed ? "hidden" : "flex"
        } flex-col`}
        id="tool-container"
      >
        <div className="mb-4 pb-4 px-4">
          <h1 className="font-bold">NLP Web Builder</h1>
          <span className="text-sm">Powered by OpenAI + DeepAI</span>
        </div>
        <div className="overflow-auto px-4 mb-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {elements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            className="w-4/5 overflow-hidden whitespace-nowrap"
                            onMouseEnter={() => {
                              setHighlightedElement(index);
                            }}
                            onMouseLeave={() => setHighlightedElement(null)}
                          >
                            <span className="text-ellipse">
                              {element.query}
                            </span>
                          </div>
                          <div
                            className="grid place-items-center cursor-pointer hover:text-red-500 transition-all"
                            onClick={() => removeElement(index)}
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="mt-auto px-4">
          <div className="relative">
            <div className="flex items-center">
              <div
                className="grid place-items-center mr-2 cursor-pointer hover:text-sky-600 transition-all"
                onClick={() => setControlClosed(true)}
              >
                <KeyboardDoubleArrowLeftIcon />
              </div>
              <div
                className="grid place-items-center mr-4 cursor-pointer hover:text-sky-600 transition-all"
                onClick={() => {
                  setSettingMenuIsOpen((prevState) => !prevState);
                  setCreateMenuIsOpen(false);
                }}
              >
                <SettingsIcon />
              </div>
              <button
                className="w-full h-10 bg-sky-500 rounded-md text-white grid place-items-center hover:bg-sky-600 transition-all"
                onClick={() => {
                  setCreateMenuIsOpen((prevState) => !prevState);
                  setSettingMenuIsOpen(false);
                }}
              >
                {loading ? (
                  <>
                    <ProgressBar
                      height="35"
                      width="35"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#FFFFFF"
                      barColor="#FFFFFF"
                    />
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
            {settingMenuIsOpen && (
              <div
                className="absolute w-full h-auto bottom-full mb-4 bg-stone-100 border border-slate-200 rounded-md p-4"
                onKeyDown={handleKeyDown}
              >
                <div className="mb-4">
                  <h1 className="mb-2 font-medium">OpenAI API Key</h1>
                  <input
                    type="password"
                    placeholder="enter your api key"
                    value={apiKey}
                    onChange={(e) => updateApiKey(e.target.value)}
                    className="pb-1 focus:outline-none border-b-2 border-gray-200 hover:border-sky-500 focus:border-sky-500 transition-all bg-transparent w-full"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h1 className="mb-2 font-medium">Randomness</h1>
                    <span>{randomness / 100}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={randomness}
                    onChange={(e) => setRandomness(e.target.value)}
                    className="w-full cursor-pointer"
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-gray-400">'esc' to close</span>
                  </div>
                  <div>
                    <button onClick={() => download("website.html", elements)}>
                      Export
                    </button>
                  </div>
                </div>
              </div>
            )}
            {createMenuIsOpen && (
              <div className="absolute w-full h-64 bottom-full mb-4">
                <div className="relative w-full h-full">
                  <textarea
                    onKeyDown={handleKeyDown}
                    onKeyUp={(e) => {
                      if (e.key === "Control") setControlPressed(false);
                    }}
                    autoFocus
                    value={question}
                    onChange={(e) => updateQuestion(e.target.value)}
                    placeholder="describe what you want&#10;'esc' to close&#10;'ctrl' + 'enter' to submit"
                    className="resize-none w-full h-full bg-stone-100 focus:outline-none p-4 rounded-md border border-slate-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        {elements.map((element, index) => (
          <DraggableComponent
            {...element}
            key={index}
            index={index}
            updateElementPosition={updateElementPosition}
            controlClosed={controlClosed}
            highlightedElement={highlightedElement}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
