const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const { event, location, custodian } = req.body;
    const { id } = req.params;
    const newEvent = await Event.create({
      event,
      location,
      custodian,
      item: id,
    });
    res.status(201).json({
      status: 'Success',
      data: {
        event: newEvent,
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
exports.getAllItemEvent = async (req, res) => {
  console.log(req.headers);
  const { id } = req.params;
  try {
    const allItemEvent = await Event.find({ item: id }).sort({ timestamp: -1 });
    res.status(201).json({
      status: 'Success',
      data: {
        item: allItemEvent,
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
exports.getLatestEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.find({ item: id })
      .sort({ timestamp: -1 })
      .limit(1);
    res.status(201).json({
      status: 'Success',
      data: {
        event: event,
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
