const {DataTypes} = require("sequelize");
const sequelize = require('../config/database')



const attendence = sequelize.define("attendence", {
   
   enrollement_no: {
     type: DataTypes.STRING,
     allowNull: false
   },
   class: {
     type: DataTypes.STRING,
     allowNull: false
   },
   subject_code: {
     type: DataTypes.TEXT,
     allowNull: false
   },
   atdstatus : {
    type: DataTypes.BOOLEAN,
    allowNull: false
   },
   date : {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
   }
});



module.exports = attendence;
