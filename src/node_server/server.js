const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const axios = require('axios'); // manage HTTP requests

app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON data

const httpRequest = {}; // Initialize an empty HTTP request object

// Allow all origins
app.use(cors({
  origin: '*',
}));

// Define the default path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("Connected")
});

// Specify the JSON data endpoint
app.post('/data', (req, res) => {
  const jsonData = req.body; // Access the JSON data posted to '/data' endpoint
  const keys = ['url', 'headers', 'parameters', 'data', 'method']; // values in user supplied JSOn
  var validKeys = [];

  // Set each section of custom URL into seperate variables
  try {
    for (const key of keys) {
      if (key in jsonData) {
        validKeys.push(key);
      }
    }
  } catch (e) {
    console.log(`JSON parsing error: ${e}`);
  }

  // parse the request and exfil valid values
  for (const key of validKeys) {
    switch (key) {
      case 'url':
        // Handle the 'url' key
        const url = jsonData.url;
        httpRequest.url = url;
        break;
  
      case 'headers':
        // Handle the 'headers' key
        const headers = jsonData.headers;
        httpRequest.headers = headers;
        break;
  
      case 'parameters':
        // Handle the 'parameters' key
        const parameters = jsonData.parameters;
        httpRequest.params = parameters;
        break;
  
      case 'data':
        // Handle the 'data' key
        const data = jsonData.data;
        httpRequest.data = data;
        break;
  
      case 'method':
        // Handle the 'method' key
        const method = jsonData.method;
        httpRequest.method = method;
        break;
  
      default:
        break;
    }
  }
  
// Make the HTTP request
axios(httpRequest)
  .then((response) => {
    // Handle the response from the HTTP request
    const responseData = response.data;

    // Send the response data back to the client
    res.status(200).json({ Response: responseData });
  })
  .catch((error) => {
    // Handle any errors that occur during the HTTP request
    console.error('Error making the HTTP request:', error);

    // Send an error response to the client
    res.status(500).send('Error making the HTTP request');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});