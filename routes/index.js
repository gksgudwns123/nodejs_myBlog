"use stirct";

const express = require("express");
const router = express.Router();

//게시글 홈
router.get("/", (req, res) => {
  res.send("helloIndex");
});

module.exports = router;
