const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(400);
        throw new Error("headers not defined");
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        res.status(401);
        throw new Error("user is not authorized or token is missing in the request");
        
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error("User is not authorized");
        }
        req.user = decoded;
    });
    next()

})


module.exports = authMiddleware;