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

studentinfo.sync({force:false}).then(() => {
    console.log('student information table created!');
    // studentinfo.bulkCreate([
    //   {
    //     name : 'Deevanshu',
    //     enrollement_no : '0834cs211033',
    //     class : 'CS-C',
    //     mobile_no : '9826728502'
    //   },
    //   {
    //     name : 'gunjan',
    //     enrollement_no : '0834cs211034',
    //     class : 'CS-B',
    //     mobile_no : '9826728502'
    //   },
    //   {
    //     name : 'deepika',
    //     enrollement_no : '0834cs211032',
    //     class : 'CS-D',
    //     mobile_no : '9826728502'
    //   },
    //   {
    //     name : 'ashwin',
    //     enrollement_no : '0834cs211035',
    //     class : 'CS-E',
    //     mobile_no : '9826728502'
    //   },
    //   {
    //     name : 'harsh',
    //     enrollement_no : '0834cs211036',
    //     class : 'CS-E',
    //     mobile_no : '9826728502'
    //   }
    // ])
}).catch((error) => {
    console.log(error);
})

module.exports = studentinfo;
