/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
var gpt3examples = require("./gpt3examples.js");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const deepai = require("deepai");
var fs = require("fs");
var request = require("request");
const deepaiApiKey = require("./apiKey.js");

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
deepai.setApiKey(deepaiApiKey);
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

app.get("/openai", async function (req, res) {
  const { apiKey, question, temperature } = req.query;
  const examples = gpt3examples.gpt3examples;

  if (
    question.toLowerCase().includes("image") ||
    question.toLowerCase().includes("photo") ||
    question.toLowerCase().includes("picture")
  ) {
    try {
      var result = await deepai.callStandardApi("text2img", {
        text: question,
      });
      console.log(result);
      res.json({ status: "Success", data: result, image: true });

      // download(result.output_url, "result_image.png", function () {
      //   console.log("done");
      // });
    } catch (e) {
      console.log(e);
    }
    return;
  }

  console.log(apiKey, question);

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createAnswer({
      // search_model: "ada",
      model: "curie",
      question,
      documents: [],
      examples_context: "Plain english to html css code",
      examples,
      max_tokens: 250,
      temperature: parseFloat(temperature),
      stop: ["\n", "<|endoftext|>"],
    });
    console.log(response.data.answers[0]);
    res.json({
      status: "Success",
      data: response.data.answers[0],
      image: false,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ status: "Error", error: e });
  }
});

app.get("/openai/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/openai", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/openai/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/openai", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/openai/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/openai", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/openai/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
