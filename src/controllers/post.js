const mongoose = require("mongoose");
const Post = require("../models/Post");

module.exports = {
  async findPosts(req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch {
      res.status(500);
      res.send({ error: "Internal server error!" });
    }
  },
  async createPost(req, res) {
    try {
      const post = new Post(req.body);
      await post.save();
      res.send(post);
    } catch {
      res.status(500);
      res.send({ error: "Internal server error!" });
    }
  },
  async findPost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      post = { ...post, ...req.body };

      await post.save();
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },
  async deletePost(req, res) {
    try {
      await Post.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },
};
