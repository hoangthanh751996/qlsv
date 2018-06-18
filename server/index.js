const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');

const db = require("./database");
const mongoose = require('mongoose');
const app = express();
const server = require('http').Server(app);

const mockupStudent = [
  {
    name: "NGuyễn Vă A",
    id: "10001",
    role: mongoose.Types.ObjectId("5b18e3ba6be2e91e5f8be8f9")
  },
  {
    name: "NGuyễn Vă B",
    id: "10002",
    role: mongoose.Types.ObjectId("5b18e3ba6be2e91e5f8be8f9")
  },
  {
    name: "NGuyễn Vă C",
    id: "10003",
    role: mongoose.Types.ObjectId("5b18e3ba6be2e91e5f8be8f9")
  },
  {
    name: "NGuyễn Vă D",
    id: "10004",
    role: mongoose.Types.ObjectId("5b18e3ba6be2e91e5f8be8f9")
  }
];

db.connect(config.get('mongodb.uri'))
  .then(async (msg) => {
    console.log(msg);
    const Student = mongoose.model('Student');

    // load middleware
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    // load routes middleware
    app.use("/api", require("./api"));

    let PORT = config.get('server.port');
    if (process.env.PORT) {
      PORT = process.env.PORT;
    }
    server.listen(PORT, function (err) {
      if (err) throw err;
      console.log("QLSV server is listening on port " + PORT);
    });
  });
