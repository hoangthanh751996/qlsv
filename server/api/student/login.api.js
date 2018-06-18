'use strict';

const api = require("express").Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const {success, fail} = require("../../utils/response-utils");
const {generateAccessToken} = require('../../services/jwt');
const config = require('config');

api.post(
  '/students/login',

  async (req, res) => {
    try {
      const {id, password} = req.body;
      const student = await Student.findOne({id, password}).populate('role.role');
      if (!student) throw new Error('Login fail');
      const payload = {
        ...student.toJSON()
      };
      delete payload.password;
      const access_token = await generateAccessToken(payload, config.get('server.secret'));
      const resPayload = {
        student: payload,
        access_token
      };
      return res.json(success(resPayload));
    }
    catch
      (err) {
      console.log(err);
      return res.json(fail(err.message));
    }
  });

module.exports = api;
