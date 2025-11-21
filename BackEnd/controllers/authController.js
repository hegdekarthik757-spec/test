/* 
  AuthController.js

  This controller manages user authentication — registration and login.

  - registerUser(): Handles new user registration.
    • Checks if the username already exists in the database.
    • If not, creates a new user document and saves it.
    • Returns a success message upon successful registration.

  - loginUser(): Handles user login.
    • Verifies that the username exists.
    • Compares the provided password with the hashed password in the database.
    • If valid, generates a JWT token that expires in 1 hour.
    • Returns user details along with the token for authentication in future requests.

  JWT tokens are signed using a secret key from the environment file (.env),
  ensuring secure and stateless authentication.
*/

const User = require('../Models/userPassword')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.JWT_SECRET;
async function registerUser(req,res) {
    let {firstname,lastname,username,password} = req.body;    
    try {
        // {usernameexist:, passwod:, firstname...}
        const duplicates = await User.find({username});
        if(duplicates && duplicates.length>0){
            return res.status(400).send({message:"user is already registered"});
        }
    } catch (err) {
        res.status(400).send(err)
    }
    let user = new User({firstname,lastname,username,password})
    const result = await user.save();
    console.log(result);
    res.status(201).send({message:"registered sucessfully"})
}
async function loginUser(req,res){
    let{username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).send({message:"user not found"})
        }
        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
            return res.status(404).send({message:"invalid Password"})
        }
        let token = jwt.sign({userId:user?._id},secretKey,{expiresIn:'1h'})
        let finalData ={
            userId:user?._id,
            firstname:user?.firstname,
            lastname:user?.lastname,
            username:user?.username,
            token
        }
        res.send(finalData)
    } catch (err) {
        console.log(err)
        res.status(400).send({message:"invalid credentials"})
    }
}
const AuthController = {
    registerUser,
    loginUser
}

module.exports = AuthController;