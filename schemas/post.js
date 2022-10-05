"use stirct";

const mongoose = require("mongoose");

var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

// userId Number 초기화
var connection = mongoose.createConnection(
  "mongodb+srv://test:sparta@cluster0.atfonxh.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

const postsSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    unique: true,
  },
});

postsSchema.plugin(autoIncrement.plugin, {
  model: "user",
  field: "userId", // auto-increment할 field
  startAt: 0, // 0에서 부터
  increment: 1, // 1씩 증가
});

// userId Number 초기화
var resetUser = connection.model("user", postsSchema);
const newResetUser = new resetUser();

newResetUser.save(function (err) {
  newResetUser.userId === 0;
  newResetUser.nextCount(function (err, count) {
    count === 1;
    newResetUser.resetCount(function (err, nextCount) {
      nextCount === 0;
    });
  });
});

module.exports = mongoose.model("Posts", postsSchema);
