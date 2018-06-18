'use strict';

const api = require("express").Router();
const mongoose = require('mongoose');
const Role = mongoose.model('Role');
const {success, fail} = require("../../utils/response-utils");
const roles = [
  {
    name: "Trùm",
    code: 0,
  },
  {
    name: "Cán bộ chi đoàn",
    code: 1
  },
  {
    name: "Lớp trưởng",
    code: 2
  },
  {
    name: "Sinh viên",
    code: 3
  }
];
api.get(
  '/roles',

  async (req, res) => {
    try {
      const models = await Role.find({});

      if (models.length === 0) {
        const defaultRoles = roles.map(r => new Role({...r}).save());
        const savedRoleModels = await Promise.all(defaultRoles);
        return res.json(success(savedRoleModels));
      }
      return res.json(success(models));
    }
    catch
      (err) {
      console.log(err);
      return res.json(fail(err.message));
    }
  });

module.exports = api;
