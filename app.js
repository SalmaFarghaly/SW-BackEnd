  const express = require("express");
  const app = express();
  const morgan = require("morgan");
  const bodyParser = require("body-parser");
  const mongoose = require("mongoose");
  const winston=require('winston')  
  const userRoutes = require('./routes/user');
  const playlistRoutes = require('./routes/playlist');
  const searchRoutes=require('./routes/search');
  const playerRoutes=require('./routes/player');
  const meRoutes =require('./routes/me');
  const homeRoutes=require('./routes/home')
  const cors=require('cors');

  //let db="mongodb+srv://maestroApplication:BACk1ENd1@cluster0-zwzxg.mongodb.net/MaestroApp?retryWrites=true&w=majority"
  let db="mongodb://localhost/MaestroApp"
 /* mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => winston.info(`Connected to MongoDB...`))*/
 
 
  mongoose.connect(db, { useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex: true  }).
  catch(error => handleError(error));
  mongoose.set('useFindAndModify', false);

  mongoose.Promise = global.Promise;
  app.use(cors());


  app.use(morgan("dev"));
  app.use('/uploads', express.static('uploads'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  
  // Routes which should handle requests

  app.use("/user", userRoutes);
  app.use("/playlist", playlistRoutes);
  app.use("/search",searchRoutes);
  app.use("/player",playerRoutes);
  app.use("/me",meRoutes);
  app.use("/home",homeRoutes);
  //app.use("/home",homeRoutes);
  ///app.use('/album', albumRoutes);
  
  app.use((req, res, next) => {
    const error = new Error("the request you want isn't supported yet");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  module.exports = app;