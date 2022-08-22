const studentinfo = require('../models/studentinfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const URL = require('url');
const attendence = require('../models/attendence');
require('dotenv').config();


const maxAge = 600;
// const maxAge = 6000;
const createToken = (id, user) => {
    return jwt.sign({ id, user }, process.env.secret_key, {
        expiresIn: maxAge
    });
};


module.exports.create = (req, res) => {
    try {
        let data = {
            name: req.body.name,
            enrollement_no: req.body.enrollement_no,
            password: req.body.enrollement_no,
            class: req.body.class,
            mobile_no: req.body.mobile_no,
        }
        studentinfo.create(data).then(() => {
            console.log(data);
            let body = {
                enrollement_no: req.body.enrollement_no,
                data: data,
                status: '1',
                error: {
                    code: '',
                    message: ""
                }
            }
            res.status(201).send(body);
        }).catch((error) => {
            let body = {
                enrollement_no: req.body.enrollement_no,
                data: '',
                status: '0',
                error: {
                    code: `${error.original.code}`,
                    message: "SERVER_ERROR"
                }
            }
            res.status(400).send(body)
        })
    } catch (error) {
        let body = {
            enrollement_no: req.body.enrollement_no,
            data: '',
            status: '0',
            error: {
                code: 'UN_ERR',
                message: "SERVER_ERROR"
            }
        }
        res.status(400).send(body)
    }
}

module.exports.login = async (req, res) => {
    var enrollement_no = req.body.enrollement_no;
    try {
        var data = await studentinfo.findOne({
            where: {
                enrollement_no: enrollement_no
            }
        });
        if (data != null) {
            const token = createToken(data.dataValues.enrollement_no, data.dataValues.name);
            let body = {
                enrollement_no: data.dataValues.enrollement_no,
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
            throw 'NOT_FOUND';
        }
    } catch (error) {
        let body = {
            enrollement_no: enrollement_no,
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

module.exports.getstudents = async (req, res) => {
    try {
        var data = await studentinfo.findAll();
        let body = {
            data: data,
            status: '1',
            error: {
                code: '',
                message: ""
            }
        }
        res.status(200).send(body);
    } catch (error) {
        let body = {
            data: '',
            status: '0',
            error: {
                code: 'ERR_DATABASE',
                message: "SERVER_ERROR"
            }
        }
        res.status(500).send(body);
    }

}

module.exports.getstudentwithattendence = async (req, res) => {
    try {
        var data = await studentinfo.findOne({
            where: {
                enrollement_no: req.body.enrollement_no
            },
            include: ["attendences"]
        });
        if (data != null) {
            res.send(data);
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

module.exports.addAttendence = async (req, res) => {
    try {
        let data = req.body;
        let a = await attendence.bulkCreate(data);
        if (a[0] == undefined) {
            let body = {
                data: '',
                status: '0',
                error: {
                    code: error,
                    message: "SERVER_ERROR"
                }
            }
            res.status(400).send(body)
        }
        else {
            res.send(a);
        }
    } catch (error) {
        let body = {
            data: '',
            status: '0',
            error: {
                code: 'UN_ERR',
                message: "SERVER_ERROR"
            }
        }
        res.status(400).send(body)
    }
}

module.exports.getAtdByClass = async (req,res) => {
    try {
        var data = await attendence.findAll({
            where: {
                class: req.body.class
            }
        });
        if (data[0] != undefined) {
            res.send(data);
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