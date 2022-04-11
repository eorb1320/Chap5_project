const express = require("express");
const Posts = require("../schmas/post.js");
const router = express.Router();
// const upload = require('./upload');
// const authMiddleware = require('./middlewares/auth-middleware.js');

//전체 조회 
router.get('/postList', async (req, res, next) => {
    try {
        const postList = await Posts.find({}).sort("-createdAt").exec();
        res.json({ postList });
    } catch (error) {
        res.status(400).send({
            errorMessage: "게시글 조회에 실패하였습니다."
        });
        next(error);
    }
})

//상세조회
router.put('/posts/:postId', async (req, res) => {
    try {
       const {postId} = req.params;
       const postList = await Posts.find({postId}).exec();
       res.json({postList});
    } catch (error) {
        res.status(400).send({
            errorMessage: "게시글 조회에 실패하였습니다."
        });
    }
})


/* router.post('/image', upload.single('image'), async (req, res) => {
    const file = await req.file;
    //console.log(file);
    try {
        const result = await file.location;
        //console.log(result);
        //사진경로가있는 주소를  image이라는 이름으로 저장
        res.status(200).json({ image: result });
    } catch (e) {
        //console.log(e);
    }
}); */



//작성
router.post('/posts',  async (req, res) => {
    try {
        const { title, content, item, image, createdAt } = req.body;
        console.log(req.body)
        /* const { userId } = res.locals;
        const emaill = userId['emaill']
        const profile = userId['profile'] */
        //공백값 확인
         if(title !== null && title !== ''&& content !== null && content !== ''&&
        item !== null && item !== ''){
            const posts = new Posts({ title, content, item, image, createdAt });
            await posts.save();
            res.status(200).send({
                result: '게시글 작성에 성공하였습니다.'
            });

        } 

    } catch (error) {
        res.status(400).send({
            errorMessage: "게시글 작성에 실패하였습니다."
        });
    }
});

//수정
router.put('/posts/:postId', async (req, res) =>{
    try{
        //파라미터 값
        const{postId} = req.params;
       /*  //유저 인증
        const{userId} = res.locals; */
        const { title, content, item, image, createdAt } = req.body;
       /*  const emaill1 = userId['emaill']
        const emaill2 = await Posts.findOne({postId}).exec(); */
        //동일 유저 확인 조건
        /* if (emaill1 !== emaill2) {
            res.send({ result: "권한이 없음" });
          } else {
            await Posts.updateOne({ postId }, { $set: {  title, content, item, image, createdAt} });
            res.send({ result: "success" });
          } */
          await Posts.updateOne({ postId }, { $set: {  title, content, item, image, createdAt} });
            res.send({ result: "success" });

    }catch(error){
        res.status(400).send({
            errorMessage: "게시글 수정에 실패하였습니다."
        });
    }
});
//삭제
router.delete('/posts/:postId', async (req, res) =>{
    try{
    const{postId} = req.params;
   /*  const{userId} = res.locals;
    const emaill1 = userId['emaill']
    const emaill2 = await Posts.findOne({postId}).exec();
    if (emaill1 !== emaill2) {
        res.send({ result: "권한이 없습니다." });
      } else {
        await bords.delete({});
        res.send({ result: "삭제가 되었습니다." });
      } */
      const postId1 = await Posts.findOne({postId}).exec();
      if(postId === postId1){
        await Posts.delete({});
        res.send({ result: "삭제가 되었습니다." });
      }
}catch(error){
    res.status(400).send({
        errorMessage: "게시글 삭제에 실패하였습니다."
    });
}
})

module.exports = router