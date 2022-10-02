import React from "react";

const Info = () => {
  return (
    <div className="w-full h-screen flex justify-center pt-24">
      <div className="w-2/5">
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">Introduction</h1>
          <p>
            Hello, we are team Six'ers and we made a web builder powered by AI
            to make web development more accessible to everyone!
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">Specifications</h1>
          <p className="mb-2">
            1. OpenAI API for interacting with GPT-3 to return html code.
          </p>
          <p className="mb-2">2. DeepAI API for generating creative images.</p>
        </div>
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">Functionalities</h1>
          <p className="mb-2">
            1. Input box to describe what you want in plain english.
          </p>
          <p className="mb-2">2. Drag and drop the rendered elements</p>
          <p className="mb-2">
            3. Side panel for control (drag and drop to reorder the elements).
            If two elements are overlayed on top of one another, the most recent
            one will appear on top of the order. Reorder in order to bring
            element to front or back.
          </p>
          <p className="mb-2">4. Export webpage to html file.</p>
        </div>
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">How to Describe?</h1>
          <p className="mb-2">1. Hello World button</p>
          <p className="mb-2">
            2. Table with the worlds top 10 countries with the highest GDP
          </p>
          <p className="mb-2">
            3. image of a pink elephant riding a roller coaster
          </p>
          <p className="mb-2">4. I LOVE THIS APP! in blue text</p>
        </div>
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">Before You Begin</h1>
          <p className="mb-2">
            1. Get an API key from OpenAI. Head over to https://openai.com/api/
            and sign up for an account if you don't have one already. After
            signup/signin, view you api key and copy it. On the bottom of the
            tool panel, click the settings icon and paste your api key to the
            api key field.
          </p>
          <p className="mb-2">
            2. There is only two parameters in the settings menu. One is for
            inputting your api key, the other for controlling the randomness of
            the response from the AI. The higher the randomness, well, the more
            random it is. A general good value is around 0.3.
          </p>
          <p className="mb-2">
            3. Given limited time, not everything is perfect. Some dragging
            features is a little buggy with images, etc.
          </p>
        </div>
        <div className="mb-12 pb-24">
          <h1 className="text-2xl font-bold mb-4">Ready?</h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-2 bg-sky-500 hover:bg-sky-600 transition-all rounded-md font-bold text-white"
          >
            Try The Tool!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
