const express = require('express')
const conncet = require('./schmas')
const port = 3000

//db연결
conncet();
//미들웨어 지정(main)
const postRouter = require('./router/post.js');
//이미지 업로드
const imgRouter = require('./router/')
const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
  };
  
// json형태로 정보전달
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//미들웨어 요청시각표시
app.use(requestMiddleware);
//게시글 요청 미들웨어
app.use('/api',[postRouter]);


app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
  });
  