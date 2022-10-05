"use stirct";

const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");

//게시글 작성
router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;

  const postCreate = await Posts.create({
    user,
    password,
    title,
    content,
  });

  return res.status(201).json({ message: "게시글을 생성하였습니다." });
});

//게시글 조회
router.get("/", async (req, res) => {
  const postAll = await Posts.find({}).sort({ createdAt: -1 });

  return res.json({
    data: postAll.map((post) => ({
      postId: post._id,
      user: post.user,
      title: post.title,
      createdAt: post.createdAt,
    })),
  });
});

//게시글 상세 조회
router.get("/:_postId", async (req, res) => {
  const userId = req.params._postId;
  const postOne = await Posts.findOne({ userId });

  return res.json({
    data: {
      postId: postOne._id,
      user: postOne.user,
      title: postOne.title,
      content: postOne.content,
      createdAt: postOne.createdAt,
    },
  });
});

//게시글 수정
router.put("/:_postId", async (req, res) => {
  const userId = req.params._postId;
  const { password, title, content } = req.body;
  const postPut = await Posts.findOne({ userId });

  if (postPut.password !== password) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 일치하지 않습니다." });
  } else {
    await Posts.updateOne({ userId }, { $set: { title, content } });
    return res
      .status(200)
      .json({ success: true, Message: "게시글을 수정하였습니다." });
  }
});

//게시글 삭제
router.delete("/:_postId", async (req, res) => {
  const userId = req.params._postId;
  const { password } = req.body;
  const postDelete = await Posts.findOne({ userId });

  if (postDelete.password !== password) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 일치하지 않습니다." });
  } else {
    await Posts.deleteOne({ userId });
    return res
      .status(200)
      .json({ success: true, Message: "게시글을 삭제하였습니다." });
  }
});

module.exports = router;
