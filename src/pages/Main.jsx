import React from "react";
import { API } from "aws-amplify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ProgressBar } from "react-loader-spinner";

import Draggable from "../components/Draggable";

const Main = () => {
  const [createMenuIsOpen, setCreateMenuIsOpen] = React.useState(false);
  const [question, updateQuestion] = React.useState("");
  const [elements, updateElements] = React.useState([]);
  const [controlPressed, setControlPressed] = React.useState(false);
  const [loading, updateLoading] = React.useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setCreateMenuIsOpen(false);
    if (e.key === "Control") setControlPressed(true);
    if (e.key === "Enter" && controlPressed) onCreate();
  };

  const onCreate = async () => {
    updateLoading((prevState) => !prevState);
    const res = await API.get("api", "/openai", {
      queryStringParameters: {
        apiKey: "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",
        question,
      },
    });
    updateElements((prevState) => [...prevState, res.data]);
    updateLoading((prevState) => !prevState);
    setCreateMenuIsOpen(false);
    updateQuestion("");
  };

  return (
    <div className="w-full h-screen relative flex">
      <div
        className="w-1/5 h-full border-slate-200 border-r-[1px] bg-slate-50"
        id="tool-container"
      >
        Tool
      </div>
      <div className="flex-1 relative">
        {elements.map((element, index) => (
          <Draggable element={element} key={index} index={index} />
        ))}
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="relative">
          <div
            className="grid place-items-center relative text-sky-500 cursor-pointer"
            onClick={() => setCreateMenuIsOpen((prevState) => !prevState)}
          >
            <AddCircleIcon fontSize="large" />
          </div>
          {createMenuIsOpen && (
            <div className="absolute w-96 h-64 bottom-full left-full mb-2 ml-2">
              <div className="relative w-full h-full">
                <textarea
                  onKeyDown={handleKeyDown}
                  onKeyUp={(e) => {
                    if (e.key === "Control") setControlPressed(false);
                  }}
                  autoFocus
                  value={question}
                  onChange={(e) => updateQuestion(e.target.value)}
                  placeholder="describe what you want"
                  className="resize-none w-full h-full bg-slate-100 focus:outline-none p-4 rounded-md border border-slate-200"
                />
                <div className="absolute bottom-4 right-4 flex items-center">
                  <button
                    className="w-24 ml-4 h-10 bg-amber-500 text-white rounded-md font-semibold border border-slate-200 hover:bg-amber-600 transition-all"
                    onClick={() =>
                      setCreateMenuIsOpen((prevState) => !prevState)
                    }
                  >
                    Close
                  </button>
                  <button
                    className="w-24 ml-4 h-10 bg-sky-500 text-white rounded-md font-semibold border border-slate-200 grid place-items-center hover:bg-sky-600 transition-all"
                    onClick={onCreate}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
