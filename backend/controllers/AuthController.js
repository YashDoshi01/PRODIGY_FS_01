const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET; 
const jwt = require("jsonwebtoken");



const signup = async (req , res ) =>{
    try {
        const {name , email , password } = req.body;
        const user = await UserModel.findOne({email});
        if(user)
        {
            return res.status(409).json({message : "user already exists" , success : false})
        }
        const userModel = new UserModel({name , email , password});
        userModel.password = await bcrypt.hash(password , 10);
        await userModel.save();
        res.status(201).json({message : "User created successfully"})   ;
    } 
    catch (error) {
        res.status(500).json({message : "Internal Server Error"})   ;
    }
}
const login = async (req , res) => {
    try {
        const {email , password } = req.body;
        const user = await UserModel.findOne({email});
        if(!user)
        {
            return res.status(403).json({message : "email or password is wrong" , success : false})
        }
        const isPassEqual = await bcrypt.compare(password , user.password);
        // console.log(isPassEqual);
        if(isPassEqual)
            {
            const jwttoken = jwt.sign({email : user.email , _id : user._id} , jwt_secret , {expiresIn : '24h'} );
            return res.status(200).json({message : "User logged successfully" , email  , name : user.name  , jwttoken})   ;
                
            }
            res.status(403).json({message : "email or password is wrong" , success : false})
    } 
    catch (error) {
        res.status(500).json({message : "Internal Server Error"});
    }
}
module.exports = {signup , login};