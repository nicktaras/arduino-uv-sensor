const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// language
const lang = 'en';
// guide copy
const uvGuide = JSON.parse(fs.readFileSync('uv_guide.json', 'utf8'));

// Mongodb
const MongoClient = require('mongodb').MongoClient;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Util method
const enrichUvData = (uvIndex) => {
  /*
    output example:
    {
    "uvIndex": 2,
      "grade": "Low",
      "desc": "A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person.",
      "tips": [
        "Wear sunglasses on bright days.",
        "If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
      ]
    }
  */
  let uvColorRating = uvGuide.index[uvIndex];
  let uvData = uvGuide.data[lang][uvColorRating];
  uvData['uvIndex'] = uvIndex;
  return uvData;
}

// For testing only.
// Return Number
const mockUvReading = () => {
  return Math.floor((Math.random() * 11) + 1)
};

// Writes to db
// implement security features to others cannot 
// post to this end point.
// - whitelist url 
// - check data object is correct
// - auth token / password
app.post('/', (req, res) => {
  // if (err) throw err; // TODO Handle errors.
  console.log('post req recived.', req.query.reading);
  MongoClient.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true }, function (err, client) {
    if (err) throw err
    if(req.query.reading) {
      var db = client.db('weather');
      
      // For test purposes
      // db.collection('uv').insertOne({
      //   uvIndex: mockUvReading()
      // }, function (err, result) {
      //   if (err) throw err;
      //   res.send(result);
      // });
      
      // post value to database
      db.collection('uv').insertOne({
        uvIndex: req.query.reading
      }, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    }
  });
});

// read from db
// type: (accepted types) 
// 'currrent'
// 'range' && 'from' && 'to' (not MVP)
app.get('/', (req, res) => {
  console.log('get req recived.');
  if (req.query.type) {
    MongoClient.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true }, function (err, client) {
      if (err) throw err; // TODO Handle errors.
      const db = client.db('weather');
      db.collection('uv').find().limit(1).sort({ $natural : -1 });
      cursor.toArray((err, results) => {
        if (err) throw err;
        uvDataEnriched = enrichUvData(results[0].uvIndex);
        res.send(uvDataEnriched);
      });
    });
  } else {
    res.status(500).send({
      code: 500,
      error: 'you must apply a type to the request.'
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})

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
