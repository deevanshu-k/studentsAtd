const {DataTypes} = require("sequelize");
const sequelize = require('../config/database');




const teacherinfo = sequelize.define("teacherinfo", {
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   subject_code: {
     type: DataTypes.TEXT,
     allowNull: false
   },
   password: {
     type: DataTypes.STRING,
     allowNull: false
   }
});


module.exports = teacherinfo;
