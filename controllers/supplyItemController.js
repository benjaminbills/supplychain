const Item = require('../models/supplyItemModel');

exports.createItem = async (req, res) => {
  try {
    let { name, category, description, manufacturer, cost, dateAdded, color } =
      req.body;
    const newItem = await Item.create({
      name,
      category,
      description,
      manufacturer,
      cost,
      dateAdded,
      color,
    });
    res.status(201).json({
      status: 'Success',
      data: {
        item: newItem,
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
exports.getAllItems = async (req, res) => {
  console.log(req.headers);
  try {
    const allItems = await Item.find();
    res.status(201).json({
      status: 'Success',
      data: {
        items: allItems,
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
exports.getOneItem = async (req, res) => {
  console.log(req.params.id);

  try {
    const item = await Item.findById(req.params.id);
    res.status(201).json({
      status: 'Success',
      data: {
        item: item,
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
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'Success',
      data: {
        item: item,
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
