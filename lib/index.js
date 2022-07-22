const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "todos",
  password: "password"
});

client
  .connect()
  .then(() => console.log("connected to client"))
  .catch(err => console.log(err.stack));

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
 const title = req.body.title;
 const description = req.body.description;
 console.log(title);
 console.log(description);
});

app.get("/", function (req, res) {
  res.send("Get request to homepage");
  console.log("1");
});

app.listen(port, () => {
  console.log("Start listening")
});