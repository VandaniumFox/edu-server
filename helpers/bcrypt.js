const { hashSync, compareSync } = require("bcryptjs");

module.exports = {
  hashPassword: (p) => hashSync(p, 10),
  comparePass: (p, h) => compareSync(p, h),
};
