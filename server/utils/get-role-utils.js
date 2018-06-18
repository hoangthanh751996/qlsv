const mongoose = require('mongoose');
const Role = mongoose.model('Role');

module.exports.getRoles = async (role, grade) => {
  const roles = await Role.find({});
  let matchRole = roles.filter(r => r.code == role);
  if (role == 1) {
    return {
      role: matchRole[0],
      resources: ['*']
    };
  } else if (role == 2) {
    return {
      role: matchRole[0],
      resources: [grade]
    };
  } else {
    return {
      role: matchRole[0],
      resources: []
    };
  }
};

module.exports.hasRole = (resources, grade) => {
  if(resources.includes('*')) {
    return true;
  } else if (resources.includes(grade)) {
    return true;
  } else {
    return false;
  }
};
