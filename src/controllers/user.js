const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const User = require("../models/User");

require("dotenv").config();

const saltRounds = 10; // 10 tours de hashage
const salt = bcrypt.genSaltSync(saltRounds); // génération du salt

module.exports = {
  async register(req, res) {
    try {
      const newUser = new User(req.body);
      newUser.hashedPassword = bcrypt.hashSync(req.body.password, salt);
      await newUser.save();
      const userObj = newUser.toObject();
      delete userObj.hashedPassword; // for security reasons

      return res.json(userObj);
    } catch (e) {
      return res.json("Error while registering user." + e);
    }
  },
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });

    try {
      if (!user) {
        return res
          .status(401)
          .json("No user found with this email. Please register.");
      }
      const match = await user.comparePassword(req.body.password);
      if (!user || !match) {
        return res
          .status(401)
          .json("Authentication failed. Invalid user or password.");
      }

      return res.json({
        token: jwt.sign(
          { email: user.email, fullName: user.fullName, _id: user._id },
          process.env.TOKEN_SECRET
        ),
      });
    } catch (e) {
      console.log(e);
    }
  },
  async generateAPIKEY(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized user! - You need to login first" });
    }
    const user = await User.findOne({ email: req.user.email });

    user.setAPIKey();
    console.log(user);
    user.save();

    const userObj = user.toObject();
    delete userObj.apiKey; // for sercurity reasons
    res.status(200).json({ apiKey: user.apiKey });
  },
  loginRequired(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user!!" });
    }
    next();
  },
  authenticateKey(req, res, next) {
    console.log(req);
    let api_key = req.header("x-api-key"); //Add API key to headers
    console.log("API key", api_key);
    if (!api_key) {
      return res.status(403).send({
        error: {
          code: 403,
          message: "You not allowed. Register for a new API-KEY",
        },
      });
    }
    next();
  },
  authorized(_, res, next) {
    console.log("action authorized");
    next();
  },
  profile(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.send(req.user);
    next();
  },
};
