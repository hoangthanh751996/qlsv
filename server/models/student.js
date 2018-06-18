"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true
  },
  role: {
    role: {type: Schema.Types.ObjectId, ref: "Role"},
    resources: []
  },
  grade: {
    type: Schema.Types.ObjectId, ref: "Grade"
  }
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
