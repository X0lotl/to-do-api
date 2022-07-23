const {Client} = require("pg");

const express = require("express");
const app = express();

const port = 3000;

const bodyParser = require("body-parser");

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

  client.query("INSERT INTO todos(title, description) VALUES ($1, $2)", [title, description]);

  res.send();

  console.log(title);
  console.log(description);
});


app.get("/todos", (req, res) => {
  console.log("req is get todos");

  client.query("SELECT * from todos", (err, resFromClient) => {
    if (err) throw err;
    res.send(resFromClient.rows);
    client.end;
  });
});

app.get("/", function (req, res) {
  res.send("Get request to homepage");
  console.log("1");
});

app.listen(port, () => {
  console.log("Start listening")
});