// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const marked = require('marked');
const { MongoClient, ObjectId } = require("mongodb");

let absolutePath = __dirname + "/static/";

// Aplication
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/static'));

// Mongo connection
const uri = "mongodb+srv://reviewr:andunita@cluster0.71lik.mongodb.net/reviewr?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to mongodb server");
  }
  finally {
    ;
  }
}
run().catch(console.dir);

// Create
app.post("/restaurants", (req, res) => {
  client.db("reviewr").collection("restaurants").insertOne(req.body);
  client.db("reviewr").collection("restaurants").find({}, {}).toArray()
    .then(x => res.json(x));
});

app.post("/articles", (req, res) => {
  client.db("reviewr").collection("articles").insertOne(req.body);
  client.db("reviewr").collection("articles").find({}, {}).toArray()
    .then(x => res.json(x));
});

// Read One
app.get("/restaurants/:id", (req, res) => {
  client.db("reviewr").collection("restaurants").find({ "_id": ObjectId(req.params.id) }, {}).next()
    .then(x => {
        if(x){
          res.json(x);
        }
        else{
          res.send('"The restaurant cannot be found."');
        }
    });
});

app.get("/articles/:id", (req, res) => {
  client.db("reviewr").collection("articles").find({ "_id": ObjectId(req.params.id) }, {}).next()
    .then(x => {
        if(x){
          res.json(x);
        }
        else{
          res.send('"The article cannot be found."');
        }
    });
});

// Read All
app.get("/restaurants", (req, res) => {
  client.db("reviewr").collection("restaurants").find({}, {}).toArray()
    .then(x => res.json(x));
});

app.get("/articles", (req, res) => {
  client.db("reviewr").collection("articles").find({}, {}).toArray()
    .then(x => res.json(x));
});

// Update
app.put("/restaurants/:id", (req, res) => {
  let current = client.db("reviewr").collection("restaurants").find({ "_id": ObjectId(req.params.id) }, {}).next();
  let newo = (current, req.body);
  client.db("reviewr").collection("restaurants").updateOne({"_id" : ObjectId(req.params.id)}, {$set: newo});
  client.db("reviewr").collection("restaurants").find({}, {}).toArray()
    .then(x => res.json(x));
});

app.put("/articles/:id", (req, res) => {
  let current = client.db("reviewr").collection("articles").find({ "_id": ObjectId(req.params.id) }, {}).next();
  let newo = (current, req.body);
  client.db("reviewr").collection("articles").updateOne({"_id" : ObjectId(req.params.id)}, {$set: newo});
  client.db("reviewr").collection("articles").find({}, {}).toArray()
    .then(x => res.json(x));
});

// Delete
app.delete("/restaurants/:id", (req, res) => {
  try{
    client.db("reviewr").collection("restaurants").deleteOne({"_id" : ObjectId(req.params.id)});
  }
  catch(e){
    console.log(e);
  }
  client.db("reviewr").collection("restaurants").find({}, {}).toArray()
    .then(x => res.json(x));
});

app.delete("/articles/:id", (req, res) => {
  try{
    client.db("reviewr").collection("articles").deleteOne({"_id" : ObjectId(req.params.id)});
  }
  catch(e){
    console.log(e);
  }
  client.db("reviewr").collection("articles").find({}, {}).toArray()
    .then(x => res.json(x));
});

// Query
app.get("/restaurants/filter/:a", (req, res) => {
  if(req.params.a=="x"){
    client.db("reviewr").collection("restaurants").find({}, {}).toArray()
      .then(x => res.json(x));
    return;
  }
  let string = req.params.a.split("&");
  let v;
  if(string[0][0] == 'r'){
    let number = parseFloat(string[0].slice(3));
    if(string[0][2] == 'h'){
      v = client.db("reviewr").collection("restaurants").find({"rating.0": {$gte:number}}, {});
    }
    else if(string[0][2] == 'l'){
      v = client.db("reviewr").collection("restaurants").find({"rating.0": {$lte:number}}, {});
    }
  }
  v.toArray()
      .then(x => res.json(x));
});


app.listen(process.env.PORT || 3000, () =>
  console.log("Server started at: http://localhost:" + ((typeof process.env.PORT === 'undefined') ? 3000 : process.env.PORT))
);