const express = require('express')
const conncet = require('./schmas')
const cors = require('cors')
const app = express();
const port = 4000

//db연결
conncet();
//미들웨어 지정(main)
const postRouter = require('./router/post');
//이미지 업로드
// const imgRouter = require('./router/')
//통신 허용 설정
const corsOptions = {
  origin: '*', // 출처 허용 옵션
  credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}
//미들웨어 동작시 동작 시간 
const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
  };
  
// json형태로 정보전달
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//미들웨어 요청시각표시
app.use(requestMiddleware);
app.use(cors(corsOptions))
//게시글 요청 미들웨어
app.use('/api',[postRouter]);


app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
  });
  