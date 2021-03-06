const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
   name: { 
       type:String , 
        required:true,
        minlength:5,
        maxlength:50
    },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1000
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id : this.id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model("User",userSchema);

function genrevalidator(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}


exports.validate = genrevalidator;
exports.User = User;