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
   subjectcode: {
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
   }
});

attendence.sync({force:false}).then(() => {
    console.log('attendence information table created!');
    // attendence.bulkCreate([
    //   {
    //     enrollement_no : '0834cs211033',
    //     class : 'CS-C',
    //     subjectcode : 'BT203',
    //     atdstatus : true,
    //     date : Date.now()
    //   },
    //   {
    //     enrollement_no : '0834cs211034',
    //     class : 'CS-B',
    //     subjectcode : 'BT203',
    //     atdstatus : true,
    //     date : Date.now()
    //   },
    //   {
    //     enrollement_no : '0834cs211032',
    //     class : 'CS-D',
    //     subjectcode : 'BT203',
    //     atdstatus : true,
    //     date : Date.now()
    //   },
    //   {
    //     enrollement_no : '0834cs211035',
    //     class : 'CS-E',
    //     subjectcode : 'BT203',
    //     atdstatus : true,
    //     date : Date.now()
    //   }
    // ])
}).catch((error) => {
    console.log(error);
})

module.exports = attendence;
