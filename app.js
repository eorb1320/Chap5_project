const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// // MongoDB 연결
// const mongoose = require("mongoose");
// var db = mongoose
// .connect('mongodb+srv://eorb1230:eorb1230@cluster0.emaap.mongodb.net/nodenode?ret' +
// 'ryWrites=true&w=majority',{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // useCreateIndex: true, //MondDB 6.0 이상에서는 지원 X
//         ignoreUndefined: true
//     })
//     .then(() => console.log('MongoDB 연결완료'))
//     .catch(err =>{console.log(err);
// });

mongoose.connect("mongodb://localhost:27017/team7-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/cors-test", (req, res) => {
  res.send("hi");
});

const commentsRouter = require("./routes/comment");
const usersRouter = require("./routes/user");
const postsRouter = require("./routes/post");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", [commentsRouter, usersRouter, postsRouter]);

app.listen(port, () => {
  console.log(port, "Server is listening...");
});
