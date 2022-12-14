import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const  User = mongoose.model("users", UserSchema);

export default User