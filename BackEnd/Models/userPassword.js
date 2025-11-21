/*
  👤 User Schema (Authentication Model)

  This Mongoose schema defines how user accounts are stored in MongoDB.
  It includes fields for firstname, lastname, username, and password.
  The schema also implements automatic password hashing and a method
  for password verification during login.

  Key Features:
    • Password hashing is done automatically before saving a user.
    • The "pre('save')" hook uses bcrypt to hash passwords securely.
    • comparePassword() allows the login controller to validate 
      plain-text passwords against the stored hash.
    • Only modified passwords are re-hashed to avoid double hashing.

  Example User Document:
    {
      firstname: "John",
      lastname: "Doe",
      username: "john123",
      password: "$2b$10$df32hfjf923jhfs98hfsa..."
    }

  This model is used for:
    - Registering users
    - Verifying login credentials
    - Linking tasks to specific users (via ObjectId references)
*/




const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userPasswordSchema = new Schema({
    firstname:String,
    lastname:String, 
    username:{
        type:String,
        required:true
    },  
    password:{
        type:String,
        required:true
    }
});
userPasswordSchema.pre("save",async function (next){
    const user = this;
    if(!user.isModified("password")) return next();
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(user.password,salt)
    user.password = hash;
    next();
})

userPasswordSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("User",userPasswordSchema)
