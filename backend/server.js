const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the search from the request
  const { search= 'hi there' } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: search,
    temperature:0.89,
  max_tokens:3774,
  top_p:1,
  frequency_penalty:0,
  presence_penalty:0,
  });
  console.log(completion.data.choices, 'choices')
  res.send(completion.data.choices[0].text);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});