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
  client.end;

  res.send();
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const description = req.body.title;
  const checked = req.body.checked;

  client.query("UPDATE todos SET title = $2, description = $3, checked = $4 WHERE id = $1", [id, title, description, checked]);

  client.end;

  res.send();
});

app.get("/todos", (req, res) => {
  console.log("req is get todos");

  client.query("SELECT * from todos", (err, resFromClient) => {
    if (err) throw err;
    res.send(resFromClient.rows);
    client.end;
  });
});

app.delete("/todos/:id", (req, res) => {
  client.query("DELETE FROM todos WHERE ID = $1", [req.params.id]);
  client.end;

  res.send();
});

app.post("/todos/:id/check", (req, res) => {
  client.query("Update todos SET checked = $2 WHERE id = $1", [req.params.id, true]);
  client.end;

  res.send();
});

app.post("/todos/:id/uncheck", (req, res) => {
  client.query("Update todos SET checked = $2 WHERE id = $1", [req.params.id, false]);
  client.end;

  res.send();
});

app.listen(port, () => {
  console.log("Start listening")
});