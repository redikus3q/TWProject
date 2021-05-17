// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const marked = require('marked');

const fs = require("fs");
let absolutePath = __dirname + "/static/";

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/static'));

// Create
app.post("/dogs", (req, res) => {
  const dogsList = readJSONRestaurants();
  dogsList.push(req.body);
  if(dogsList.length==1){
    dogsList[0].id="1";
  }
  else{
    dogsList[dogsList.length-1].id=(parseInt(dogsList[dogsList.length-2].id)+1).toString();
  }
  writeJSONRestaurants(dogsList);
  res.json(dogsList);
});

app.post("/articles", (req, res) => {
  const dogsList = readJSONArticles();
  dogsList.push(req.body);
  if(dogsList.length==1){
    dogsList[0].id="1";
  }
  else{
    dogsList[dogsList.length-1].id=(parseInt(dogsList[dogsList.length-2].id)+1).toString();
  }
  writeJSONArticles(dogsList);
  res.json(dogsList);
});

// Read One
app.get("/dogs/:id", (req, res) => {
  const dogsList = readJSONRestaurants();
  let ok = 0;
  for (let dog in dogsList){
    if(dogsList[dog].id==req.params.id){
      ok=1;
      res.json(dogsList[dog]);
    }
  }
  if(ok==0){
    res.send('"Nu exista restaurantul."');
  }
});

app.get("/articles/:id", (req, res) => {
  const dogsList = readJSONArticles();
  let ok = 0;
  for (let dog in dogsList){
    if(dogsList[dog].id==req.params.id){
      ok=1;
      res.json(dogsList[dog]);
    }
  }
  if(ok==0){
    res.send('"Nu exista restaurantul."');
  }
});

// Read All
app.get("/dogs", (req, res) => {
  const dogsList = readJSONRestaurants();
  console.log(dogsList);
  res.json(dogsList);
});

app.get("/articles", (req, res) => {
  const dogsList = readJSONArticles();
  console.log(dogsList);
  res.json(dogsList);
});

// Update
app.put("/dogs/:id", (req, res) => {
  const dogsList = readJSONRestaurants();
  let k=0;
  for(let dog in dogsList){
    if(dogsList[dog].id==req.params.id){
      let i=dogsList[dog].id;
      let j=dogsList[dog].rating;
      dogsList[dog]=req.body;
      dogsList[dog].id=i;
      dogsList[dog].rating=j;
      k=1;
    }
  }
  if(k==0){
    res.send('"Nu exista restaurantul."');
  }
  else{
    writeJSONRestaurants(dogsList);
    res.send('"S-a modificat."');
  }
});

app.put("/articles/:id", (req, res) => {
  const dogsList = readJSONArticles();
  let k=0;
  for(let dog in dogsList){
    if(dogsList[dog].id==req.params.id){
      let i=dogsList[dog].id;
      dogsList[dog]=req.body;
      dogsList[dog].id=i;
      k=1;
    }
  }
  if(k==0){
    res.send('"Nu exista restaurantul."');
  }
  else{
    writeJSONArticles(dogsList);
    res.send('"S-a modificat."');
  }
});

// Delete
app.delete("/dogs/:id", (req, res) => {
  const dogsList = readJSONRestaurants();
  let newList=[];
  let k=0;
  for(let dog in dogsList){
    if(dogsList[dog].id!=req.params.id){
      newList.push(dogsList[dog]);
      k+=1;
    }
  }
  if(k==dogsList.length){
    res.send('"Nu exista restaurantul."')
  }
  else{
    writeJSONRestaurants(newList);
    res.send('"S-a sters."');
  }
  res.sendFile(absolutePath + "index.html");
});

app.delete("/articles/:id", (req, res) => {
  const dogsList = readJSONArticles();
  let newList=[];
  let k=0;
  for(let dog in dogsList){
    if(dogsList[dog].id!=req.params.id){
      newList.push(dogsList[dog]);
      k+=1;
    }
  }
  if(k==dogsList.length){
    res.send('"Nu exista restaurantul."')
  }
  else{
    writeJSONArticles(newList);
    res.send('"S-a sters."');
  }
  res.sendFile(absolutePath + "index.html");
});

//Manipulare JSON
function readJSONRestaurants() {
  return JSON.parse(fs.readFileSync("databases/restaurants.json"))["restaurants"];
}

function writeJSONRestaurants(content) {
  fs.writeFileSync(
    "databases/restaurants.json",
    JSON.stringify({ restaurants: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function readJSONArticles() {
  return JSON.parse(fs.readFileSync("databases/articles.json"))["articles"];
}

function writeJSONArticles(content) {
  fs.writeFileSync(
    "databases/articles.json",
    JSON.stringify({ articles: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);