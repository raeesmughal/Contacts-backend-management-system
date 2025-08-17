const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required.");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error('User with this Email already exists.')
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    if (!newUser) {
        res.status(400);
        throw new Error('User data is not valid');
    }

    res.status(201).json({ _id: newUser.id, email: newUser.email })
})



// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required.");
    }


    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("This email is not found in the record");
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        res.status(400);
        throw new Error("password is incorrect");
    }


    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(200).json({token});


})




// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    // const {name,email,id} = req.user;

    // const user = await User.findById(id);

    // if(!user){
    //     res.status(404);
    //     throw new Error("User not found");
    // }

    res.status(200).json(req.user);
})




module.exports = {
    registerUser,
    loginUser,
    currentUser
}