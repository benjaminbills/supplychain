const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate('item')
      .populate({ path: 'currentCustodian', select: '-password' });
    res.status(201).json({
      status: 'Success',
      data: {
        orders: allOrders,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(201).json({
      status: 'Success',
      data: {
        order: order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'Success',
      data: {
        item: order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
    });
  }
};
