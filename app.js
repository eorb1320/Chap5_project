const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/team7-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const port = 3000;

app.use(cors());
app.get("/cors-test", (req, res) => {
  res.send("hi");
});

const commentsRouter = require("./routes/comment");

app.use("/api", [commentsRouter]);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(express.json());

app.listen(port, () => {
  console.log(port, "Server is listening...");
});
