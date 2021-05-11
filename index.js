// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");
let absolutePath = __dirname + "/static/";

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/static'));


app.get("/", (req, res) => {
  res.sendFile(absolutePath + "index.html");
})

app.use("/script.js", (req, res) => {
  res.sendFile(absolutePath + "script.js");
})

app.use("/styles.css", (req, res) => {
  res.sendFile(absolutePath + "stlyes.css");
})

// Create
app.post("/dogs", (req, res) => {
  const dogsList = readJSONFile();
  dogsList.push(req.body);
  if(dogsList.length==1){
    dogsList[0].id="1";
  }
  else{
    dogsList[dogsList.length-1].id=(parseInt(dogsList[dogsList.length-2].id)+1).toString();
  }
  writeJSONFile(dogsList);
  res.json(dogsList);
});

// Read One
app.get("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  let ok = 0;
  for (let dog in dogsList){
    if(dogsList[dog].id==req.params.id){
      ok=1;
      res.json(dogsList[dog]);
    }
  }
  if(ok==0){
    res.send('"Nu exista cainele."');
  }
});

// Read All
app.get("/dogs", (req, res) => {
  const dogsList = readJSONFile();
  console.log(dogsList);
  res.json(dogsList);
});

// Update
app.put("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
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
    res.send('"Nu exista cainele."');
  }
  else{
    writeJSONFile(dogsList);
    res.send('"S-a modificat."');
  }
});

// Delete
app.delete("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  let newList=[];
  let k=0;
  for(let dog in dogsList){
    if(dogsList[dog].id!=req.params.id){
      newList.push(dogsList[dog]);
      k+=1;
    }
  }
  if(k==dogsList.length){
    res.send('"Nu exista cainele."')
  }
  else{
    writeJSONFile(newList);
    res.send('"S-a sters."');
  }
  res.sendFile(absolutePath + "index.html");
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["dogs"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ dogs: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);