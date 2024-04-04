const Level = require('../models/Level');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get_all_levels = asyncHandler(async (req, res, next) => {
  const allLevels = await Level.find({}).lean().exec();
  if (!allLevels.length) {
    return res.status(404).json({
      message: 'No levels found.',
    });
  }
  return res.json(allLevels);
});

exports.post_create_level = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});

exports.get_levels_count = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});
