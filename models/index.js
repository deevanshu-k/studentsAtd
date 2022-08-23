const attendence = require('./attendence');
const studentinfo = require('./studentinfo');
const teacherinfo = require('./teacher');

studentinfo.hasMany(attendence,{foreignKey:'enrollement_no'});
attendence.belongsTo(studentinfo,{foreignKey : 'enrollement_no'});



studentinfo.sync({force:false}).then(async () => {
   
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


teacherinfo.sync({force:false}).then(async() => {
    console.log('teacher information table created!');
    // await teacherinfo.create({
    //     name : 'SuperUser',
    //     subject_code : 'RT-111',
    //     password: '$2b$10$zF/tqAtjtUHnqusAmKzAz.8D2arE9nDOMG3sUrAclgQCa5GsDl27S'
    // });
    // await teacherinfo.bulkCreate([{
    //     name : 'sampleteacher',
    //     subject_code : 'BT-201',
    //     password: '12345678'
    // },
    // {
    //     name : 'sampleteacher',
    //     subject_code : 'BT-202',
    //     password: '12345678'
    // },
    // {
    //     name : 'sampleteacher',
    //     subject_code : 'BT-203',
    //     password: '12345678'
    // },
    // {
    //     name : 'sampleteacher',
    //     subject_code : 'BT-204',
    //     password: '12345678'
    // },
    // {
    //     name : 'sampleteacher',
    //     subject_code : 'BT-205',
    //     password: '12345678'
    // }])
}).catch((error) => {
    console.log(error);
})

module.exports = {studentinfo,attendence,teacherinfo};