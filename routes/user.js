const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/users.model");
const config = require("../config");
let middleware = require("../middleware");
router.route("/:id").get(middleware.checkToken, (req, res) => {
    User.findOne({ id: req.params.id }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      return res.json({
        data: result,
        id: req.params.id,
      });
    });
  });
  
  router.route("/checkid/:email").get((req, res) => {
    User.findOne({ email: req.params.email }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      if (result != null) {
        return res.json({
          Status: true,
        });
      } else
        return res.json({
          Status: false,
        });
    });
  });
  
  router.route("/login").post((req, res) => {
    User.findOne({ email: req.body.email }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      if (result === null) {
        return res.status(403).json("email incorrect");
      }
      if (result.password === req.body.password) {
        // here we implement the JWT token functionality
        let token = jwt.sign({ id: req.body.id }, config.key, {});
  
        res.json({
          token: token,
          msg: "success",
        });
      } else {
        res.status(403).json("password is incorrect");
      }
    });
  });
  
  router.route("/register").post((req, res) => {
    console.log("inside the register");
    const user = new User({
      name : req.body.name,
      password : req.body.password,
      email : req.body.email,
    });
    user
      .save()
      .then(() => {
        console.log("user registered");
        res.status(200).json({ msg: "User Successfully Registered" });
      })
      .catch((err) => {
        res.status(403).json({ msg: err });
      });
  });
  
  router.route("/update/:email").patch(middleware.checkToken, (req, res) => {
    User.findOneAndUpdate(
      { email: req.params.email },
      { $set: { password: req.body.password } },
      (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        const msg = {
          msg: "password successfully updated",
          name: req.params.name,
        };
        return res.json(msg);
      }
    );
  });
  
  router.route("/delete/:email").delete(middleware.checkToken, (req, res) => {
    User.findOneAndDelete({ email: req.params.email }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      const msg = {
        msg: "User deleted",
        email: req.params.email,
      };
      return res.json(msg);
    });
  });
  
  module.exports = router;