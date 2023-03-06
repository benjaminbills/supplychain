const User = require('../models/userModel');
const bycrypt = require('bcryptjs');
exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bycrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
      role: 'user',
    });
    res.status(201).json({
      status: 'Success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
