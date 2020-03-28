const mongoose = require('mongoose');
//const config = require('config')
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      minlength: [1,'Username must be at least 1 characters.'],
      maxlength: [15,'Username must be max 15 characters.']
    },
   
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 128,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 80
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
   birthDate:{
      type: Date,
      required: true,
     
    },

    gender:{
      type: Boolean,
      required: true
    },
    followersCount: { 
      type: Number, 
      default: 0
    },
    isPremium :{
      type: Boolean,
      default: false
    },
    image:{
     data: Buffer,
     contentType: String,
    
    },
    providInfo:{
      type: Boolean,
      default: false
    },
    country:{
      type: String,
      default: 'Egypt'
    },
    type:{
      type: String,
      default: 'user'
    },
    externalUrls:{
      
        key:{
          type: String,
          default: 'Mestro'
        },
        value:{
          type: String,
          default: 'https://open.Mestro.com/users/'
        }
      
  },
  uri:{
    type: String,
    default: 'Mestro:User:'
     
  },
  href:{
    type: String,
    default:' https://api.Mestro.com/v1/users/'
  }
});

module.exports= mongoose.model('User', userSchema);


 
