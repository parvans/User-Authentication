import User from "../models/User.js";
import bcrypt, { hash } from "bcrypt"
import jwt from 'jsonwebtoken'
const saltRound = 10;

export default {
  getallUsers: async (req, res, next) => {
    let users;
    try {
      users = await User.find()
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: 'No Users Found' })
    } else {
      return res.status(200).json({ users })
    }
  },
  signup: async (req, res) => {
    const email = req.body.email
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      res.send(`${email} is already exist...`);
    } else {
      bcrypt.hash(req.body.password, saltRound, (err, hash) => {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        newUser.save(function (err) {
          if (err) {
            console.log("error");
          } else {
            res.send(newUser);
          }
        });
      });
    }
  },
  login: async (req, res) => {
    const email = req.body.email
    const existingData = await User.findOne({ email })
    if (!existingData) {
      return res.send("The email is not found")
    } else {
      try {
        let validPassword = await bcrypt.compare(req.body.password, existingData.password)
        if (!validPassword) {
          return res.send("Not a valid Password")
        } else {

          const token = jwt.sign(
            { _id: existingData._id, isAdmin: existingData.isAdmin },
            process.env.SECRETKEY);
          res.header("x-auth-token", token).send(token);
        }

      } catch (error) {
        res.send(error)
      }
    }
  },
  updateUser:async(req,res)=>{
    const {name,email,password}=req.body
    const userId=req.params.id
    try {
      let upUser=await User.findOne({_id:userId})
      if(upUser){
        bcrypt.hash(upUser.password,async(err,hash)=>{
          let updataUser=await User.updateMany(
            {_id:userId},
            {
              $set:{
                name,
                email,
                password:hash
              }
            }
          )
          res.send(updataUser)
        })
      }
      if (!upUser) {
        res.send("The User is unavailable or doese not exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteUser:async(req,res)=>{
    const userId=req.params.id
    try {
      let deleteUser=await User.findByIdAndDelete(userId)
      if(!deleteUser){
        res.send("The User is unavailable or doese not exist");
      }
      res.send("The User is Removed from DataBase")
    } catch (error) {
      console.log(error.message);
    }
  }
}