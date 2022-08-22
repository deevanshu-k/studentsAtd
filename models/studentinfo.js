const {DataTypes} = require("sequelize");
const sequelize = require('../config/database')



const studentinfo = sequelize.define("studentinfo", {
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   enrollement_no: {
     type: DataTypes.STRING,
     allowNull: false,
     primaryKey : true
   },
   class: {
     type: DataTypes.STRING,
     allowNull: false
   },
   mobile_no: {
     type: DataTypes.BIGINT,
     allowNull: false
   }
});

module.exports = studentinfo;
