const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 특정 도메인 허용
});

mongoose.connect("mongodb://localhost:27017/team7-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const port = 5000;

// const corsOption = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
app.use(cors({ origin: "http://localhost:3000" }));

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
