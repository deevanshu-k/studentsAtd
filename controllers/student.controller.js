const studentinfo = require('../models/studentinfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const URL = require('url');
require('dotenv').config();


const maxAge = 600000;
// const maxAge = 6000;
const createToken = (id, user) => {
    return jwt.sign({ id, user }, process.env.secret_key, {
        expiresIn: maxAge
    });
};


module.exports.create = (req, res) => {
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
                code: error.original.code,
                message: "SERVER_ERROR"
            }
        }
        res.status(400).send(body)
    })
}

module.exports.get_byeno = async (req, res) => {
    var url = URL.parse(req.url, true);
    var data = {
        enrollement_no: url.query.enrollement_no
    }

    try {
        var data = await studentinfo.findOne({
            where: data
        });
        if (data != null) {
            let body = {
                enrollement_no: url.query.enrollement_no,
                data: data,
                status: '1',
                error: {
                    code: '',
                    message: ""
                }
            }
            res.status(200).send(body);
        }
        else {
            throw 'ER_NOT_FOUND';
        }
    } catch (error) {
        let body = {
            enrollement_no: url.query.enrollement_no,
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