"use stirct";

const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment");

//댓글 생성
router.post("/:_postId", async (req, res) => {
  const { user, password, content } = req.body;

  const commentCreate = await Comments.create({
    user,
    password,
    content,
  });

  return res.status(201).json({ message: "댓글을 생성하였습니다." });
});

//댓글 목록 조회
router.get("/:_postId", async (req, res) => {
  const userId = req.params._postId;

  const commentAll = await Comments.find({ userId }).sort({ createdAt: -1 });

  return res.json({
    data: commentAll.map((comment) => ({
      commentId: comment._id,
      user: comment.user,
      content: comment.content,
      createdAt: comment.createdAt,
    })),
  });
});

//댓글 수정
router.put("/:_commentId", async (req, res) => {
  const userId = req.params._commentId;
  const { password, content } = req.body;
  const commentPut = await Comments.findOne({ userId });

  if (commentPut.password !== password) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 일치하지 않습니다." });
  } else if (!content) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
  } else {
    await Comments.updateOne({ userId }, { $set: { content } });
    return res.status(200).json({ message: "댓글을 수정하였습니다." });
  }
});

//댓글 삭제
router.delete("/:_commentId", async (req, res) => {
  const userId = req.params._commentId;
  const { password } = req.body;
  const commentDelete = await Comments.findOne({ userId });

  if (commentDelete.password !== password) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 일치하지 않습니다." });
  } else {
    await Comments.deleteOne({ userId });
    return res
      .status(200)
      .json({ success: true, Message: "댓글을 삭제하였습니다." });
  }
});

module.exports = router;
