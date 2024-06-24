const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Data storage
const records = [];

// Routes
app.get("/add", (req, res) => {
  res.render("index");
});

app.post("/add", (req, res) => {
  const { name, group } = req.body;
  if (name && group) {
    records.push({ name, group });
    res.redirect("/view");
  } else {
    res.status(400).send("Invalid input");
  }
});

app.get("/view", (req, res) => {
  if (records.length === 0) {
    res.render("view", { records: null });
  } else {
    res.render("view", { records });
  }
});

app.get("/view/:group", (req, res) => {
  const group = req.params.group;
  const filteredRecords = records.filter((record) => record.group === group);
  if (filteredRecords.length === 0) {
    res.render("filter", { records: null, group });
  } else {
    res.render("filter", { records: filteredRecords, group });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
