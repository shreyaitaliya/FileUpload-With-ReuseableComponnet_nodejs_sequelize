const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).send({
            success: false,
            message: 'Token is blank',
        });
    }
    let donetoken = token.split(' ')[1];
    jwt.verify(donetoken, 'multiple', (error, decoded) => {
        if (error) {
            return res.status(400).send({
                success: false,
                message: 'Token is not valid',
            });
        }
        req.user = decoded.loginUser;
        next();
    });
}

module.exports = verifytoken;     
