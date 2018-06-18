'use strict';

const api = require("express").Router();
const mongoose = require('mongoose');
const {success, fail} = require("../../utils/response-utils");
const Grade = mongoose.model('Grade');
const mockupGrades = [
  {
    name: "K59CLC",
    session: "2014-2018",
  },
  {
    name: "K59CA",
    session: "2014-2018",
  },
  {
    name: "K59CC",
    session: "2014-2018",
  },
  {
    name: "K59CD",
    session: "2014-2018",
  },
  {
    name: "K59CB",
    session: "2014-2018",
  },
  {
    name: "K59CN",
    session: "2014-2018",
  }
];

api.get(
  '/grades',

  async (req, res) => {
    try {
      const grades = await Grade.find({});
      if (grades.length === 0) {
        const defaultGrades = mockupGrades.map(g => new Grade({...g}).save());
        const saved = await Promise.all(defaultGrades);
        return res.json(success(saved));
      }
      return res.json(success(grades));
    }
    catch
      (err) {
      console.log(err);
      return res.json(fail(err.message));
    }
  });

module.exports = api;
