const express = require("express");
const Comments = require("../schemas/comment");
const router = express.Router();

// // 테스트 요청
// router.get("/comments", async (req, res) => {
//   const [comments] = await Comments.find({});
//   console.log(comments);

//   res.json({
//     comments,
//   });
// });

//댓글을 저장합니다.
router.post("/comments", async (req, res) => {
  const { comment, createdAt } = req.body;
  const postId = req.params;
  console.log(postId);
  console.log(typeof postId);
  // const userId = res.locals.user._id;
  // const { nickname, userImage } = res.locals.user;
  // console.log(userId);

  const createdComment = await Comments.create({
    comment,
    createdAt,
    postId,
  });

  res.status(201).json({
    msg: "등록 완료!",
  });
});

//댓글 목록 조회
router.get("/comments/:postId", async (req, res) => {
  const postId = req.params;
  console.log(postId);
  const comments = await Comments.find({ postId: postId });

  res.status(200).json({
    comments,
  });
});

// //댓글을 수정합니다.
// router.put("/comments/:commentId", authMiddleware, async (req, res) => {
//   const commentId = req.params;
//   const { comment } = req.body;
//   console.log(comment, commentId);

//   const existComment = await Comments.find({ commentId });

//   if (existComment.length) {
//     await Comments.updateOne({ _id: commentId }, { $set: { comment } });
//   }

//   res.status(200).json({
//     msg: "수정 완료!",
//   });
// });

// //댓글을 삭제합니다.
// router.delete("/comments/:commentId", authMiddleware, async (req, res) => {
//   const commentId = req.params;
//   console.log(commentId);

//   const existComment = await Comments.find({ _id: commentId });
//   console.log(existComment);

//   if (existComment.length > 0) {
//     await Comments.deleteOne({ _id: commentId });
//   }

//   res.status(200).json({
//     success: true,
//     msg: "삭제 완료!",
//   });
// });

module.exports = router;
