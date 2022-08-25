const jwt = require('jsonwebtoken');
const teacherinfo = require('../models/teacher')
const studentinfo = require('../models/studentinfo')
require('dotenv').config;

const maxAge = 600;
// const maxAge = 6000;
const createToken = (id, user) => {
    return jwt.sign({ id, user }, process.env.secret_key_teacher ,{
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

module.exports.getallstudentsbyclass = async (req,res) => {
    try {
        console.log(req.query);
        var $class = req.body.class;
        if (!$class) {
            $class = req.query.class;
        }
        let data = await studentinfo.findAll({
            where : {
                class : $class
            }
        })
        if (data != null) {
            res.status(200).send(data);
        }
        else {
            let body = {
                data: '',
                status: '0',
                error: {
                    code: 'NOT_FOUND',
                    message: "NOT_FOUND"
                }
            }
            res.status(404).send(body);
        }
    } catch (error) {
        console.log(error);
        let body = {
            data: '',
            status: '0',
            error: {
                code: 'ERR_DB',
                message: "SERVER_ERROR"
            }
        }
        res.status(500).send(body);
    }
}