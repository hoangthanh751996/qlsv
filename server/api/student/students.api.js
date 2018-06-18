'use strict';

const api = require("express").Router();
const mongoose = require('mongoose');
const getRoles = require("../../utils/get-role-utils").getRoles;
const {hasRole} = require("../../utils/get-role-utils");
const {success, fail} = require("../../utils/response-utils");
const Student = mongoose.model('Student');
const Grade = mongoose.model('Grade');
const authMidleware = require('../auth.mid');

const roles = {
  student: {
    can: ['read', 'write']
  }
};

api.get(
  '/students',

  async (req, res) => {
    const Role = mongoose.model('Role');
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

api.get(
  '/students/:id',

  async (req, res) => {
    try {

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

api.post('/students', async (req, res) => {
  try {
    let studentInfo = {...req.body};
    if (studentInfo.role) {
      let role = await getRoles(studentInfo.role, studentInfo.grade);
      studentInfo.role = role;
    }
    let grade = await Grade.findOne({name: studentInfo.grade});
    if(!grade) throw new Error('Not found grade');
    studentInfo.grade = grade;
    let student = await new Student(studentInfo).save();
    return res.json(success(student));
  } catch (err) {
    console.log(err);
    return res.json(fail(err.message));
  }
});

api.put('/students/:id',
  authMidleware,
  async (req, res) => {
    try {
      const {id} = req.params;
      const {_id} = req.payload;
      let check = false;
      const student = await Student.findOne({id: id}).populate('grade');
      const _student = await Student.findOne({_id: mongoose.Types.ObjectId(_id)}).populate('grade');
      if (!student) throw new Error('Not found student to edit');
      if (student.id === _student.id) {
        check = true;
      } else {
        check = hasRole(_student.role.resources, student.grade.name);
      }
      if(check) {
        return res.json(success('Bạn có quyền chỉnh sửa'));
      } else {
        throw new Error('Bạn không có quyền chỉnh sửa')
      }
    } catch (err) {
      console.log(err);
      return res.json(fail(err.message));
    }
  });

module.exports = api;
