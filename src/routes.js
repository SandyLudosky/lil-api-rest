const express = require("express");
const router = express.Router();
const {
  findPosts,
  findPost,
  createPost,
  updatePost,
  deletePost,
} = require("./controllers/post");

const {
  loginRequired,
  authorized,
  authenticateKey,
  generateAPIKEY,
} = require("./controllers/user");

router.get("/posts", authorized, findPosts);
router.post("/auth/generateKey", loginRequired, generateAPIKEY);
router.post("/posts", loginRequired, authenticateKey, createPost);
router.get("/posts/:id", loginRequired, findPost);
router.patch("/posts/:id", loginRequired, updatePost);
router.delete("/posts/:id", loginRequired, deletePost);

module.exports = router;
