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

teacherinfo.sync({force:false}).then(async() => {
    console.log('teacher information table created!');
    // await teacherinfo.create({
    //     name : 'SuperUser',
    //     subject_code : 'RT-111',
    //     password: '$2b$10$zF/tqAtjtUHnqusAmKzAz.8D2arE9nDOMG3sUrAclgQCa5GsDl27S'
    // });
    // await teacherinfo.create({
    //     name : 'sampleteacher',
    //     subject_code : 'BT-201',
    //     password: '12345678'
    // })
}).catch((error) => {
    console.log(error);
})

module.exports = teacherinfo;
