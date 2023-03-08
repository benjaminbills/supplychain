const User = require('../models/userModel');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bycrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
      role: 'user',
    });
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      `${JWT_SECRET}`,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'user not found',
      });
    }
    const isCorrect = await bycrypt.compare(password, user.password);
    if (isCorrect) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        `${JWT_SECRET}`,
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({ token });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'incorrect username or password',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    if (!req.body.role) {
      throw new Error('Incorrect data');
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: error,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1)Getting token and check if its there
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('iamhere');
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token || 'No token added to the request');
  try {
    const decoded = jwt.verify(token, `${JWT_SECRET}`);
    await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    try {
      const decoded = jwt.verify(token, `${JWT_SECRET}`);
      const user = await User.findById(decoded.userId);
      if (!roles.includes(user.role)) {
        throw new Error('You do not have permission to perform this action');
      }
      next();
    } catch (error) {
      const errorMessage = 'You do not have permission to perform this action';
      res.status(401).json({ error: errorMessage });
    }
  };
};
