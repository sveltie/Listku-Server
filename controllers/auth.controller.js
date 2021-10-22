const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user: {username: user.username}, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    };

    // Check if user exist with email
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('No users found.');
    };

    // Check is the provided password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Please enter a correct password.');
    };

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

module.exports = {
    register,
    login
};