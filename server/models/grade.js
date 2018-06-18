"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  school: String,
  session: String
});

const Grade = mongoose.model("Grade", GradeSchema);
module.exports = Grade;
