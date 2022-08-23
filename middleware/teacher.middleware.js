const jwt = require('jsonwebtoken');
require('dotenv').config();


const checkteacherauth = (req, res, next) => {
    
    try {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, process.env.secret_key_teacher, async (err, decodedToken) => {
                if (err) {
                    let body = {
                        data: '',
                        status: '0',
                        error: {
                            code: 'UNAUTHORISED',
                            message: "SERVER_ERROR"
                        }
                    }
                    res.status(400).send(body);
                } else {
                    req.decodedToken = decodedToken;
                    console.log(decodedToken.exp*1000 - Date.now());
                    if(Date.now() > decodedToken.exp * 1000){
                        let body = {
                            data: '',
                            status: '0',
                            error: {
                                code: 'UNAUTHORISED',
                                message: "SERVER_ERROR"
                            }
                        }
                        res.status(400).send(body);
                    }
                    next();
                }
            });
        } else {
            let body = {
                data: '',
                status: '0',
                error: {
                    code: 'UNAUTHORISED',
                    message: "SERVER_ERROR"
                }
            }
            res.status(400).send(body);
        }
    } catch (error) {
        let body = {
            data: '',
            status: '0',
            error: {
                code: 'UNAUTHORISED',
                message: "SERVER_ERROR"
            }
        }
        res.status(400).send(body);
    }
    
};

module.exports = { checkteacherauth };