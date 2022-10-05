"use strict";

//express
const express = require("express");
const app = express();

//server
const port = 3000;

//몽고db 연결
const connect = require("./schemas");
connect();

//몽구스
const mongoose = require("mongoose");

//라우팅
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

//몽고db 연결
mongoose.connect(
  "mongodb+srv://test:sparta@cluster0.atfonxh.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

//미들웨어
app.use(express.json());
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

//server
app.listen(port, () => {
  console.log(port, "3000번 포트로 서버가 열렸습니다.");
});
