const express = require('express');
const app = express();
const port = 3000;
// const axios = require('axios');
const fs = require('fs');

const lang = 'en';
const mockUvReading = 0;
const uvGuide = JSON.parse(fs.readFileSync('uv_guide.json', 'utf8'));

// write to db
app.post('/incoming', (req, res) => {
  // implement security features to others cannot 
  // post to this end point.
  // - whitelist url 
  // - check data object is correct
  // - auth token / password
  // Post data to db
  // Example of data
  // { id: 0, uvIndex: 3 } 
  res.send('POST request not succesful... yet');
});

// read from db
// example request: localhost:3000 params: type = current
// type: (accepted types) 
//  'currrent' (only) - MVP
//  'range' && 'from' && 'to'
app.get('/', (req, res) => {
  if (req.query.type) {
    // Read data from db
    // For MVP this will read the latest entry only
    // with the data recieved we will enrich
    // the uv index with additional information
    // Example:
    //  {
    //  "uvIndex": 2,
    // 	"grade": "Low",
    // 	"desc": "A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person.",
    // 	"tips": [
    // 		"Wear sunglasses on bright days.",
    // 		"If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
    // 	]
    // }
    let uvColorRating = uvGuide.index[mockUvReading];
    let uvData = uvGuide.data[lang][uvColorRating];
    res.send(uvData);
  } else {
    res.status(500).send({
      code: 500,
      error: 'you must apply a type to the request.'
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// TODO - consider graphql
// var express = require('express');
// var express_graphql = require('express-graphql');
// var { buildSchema } = require('graphql');
// // GraphQL schema
// var schema = buildSchema(`
//     type Query {
//         message: String
//     }
// `);
// // Root resolver
// var root = {
//     message: () => 'Hello World!'
// };
// query with: { message }
// // Create an express server and a GraphQL endpoint
// var app = express();
// app.use('/graphql', express_graphql({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));
// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
