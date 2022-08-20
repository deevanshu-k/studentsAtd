const jwt = require('jsonwebtoken');
const teacherinfo = require('../models/teacher')

const maxAge = 600000;
// const maxAge = 6000;
const createToken = (id, user) => {
    return jwt.sign({ id, user }, process.env.secret_key, {
        expiresIn: maxAge
    });
};

module.exports.login = async (req,res) => {
    
    try {
        var data = {
            subject_code : req.body.subject_code,
            password : req.body.password
        }
        var db = await teacherinfo.findOne({
            where : data
        });
        if (db != null) {
            const token = createToken(db.dataValues.subject_code,db.dataValues.name);
            let body = {
                subject_code: db.dataValues.subject_code,
                data: {
                    token: token
                },
                status: '1',
                error: {
                    code: '',
                    message: ""
                }
            }
            res.status(200).json(body);
        }
        else {
            throw 'CHECK_CODE_OR_PASSWORD';
        }
    } catch (error) {
        let body = {
            subject_code: data.subject_code,
            data: '',
            status: '0',
            error: {
                code: error,
                message: "SERVER_ERROR"
            }
        }
        res.status(400).send(body)
    }
}
