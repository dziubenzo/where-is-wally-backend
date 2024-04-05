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

exports.post_create_level = [
  // Check password
  body('password').custom((value) => {
    return value === process.env.PASSWORD ? true : false;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Return error if password incorrect
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'No way Jose!',
      });
    }

    const name = req.body.name;
    const image_url = req.body.image_url;
    const coordinatesArray = JSON.parse(req.body.coordinates);
    const url_parameter = (await Level.countDocuments({}).lean().exec()) + 1;

    const level = new Level({
      url_parameter: url_parameter,
      name: name,
      image_url: image_url,
      characters: {
        wally: {
          x: coordinatesArray[0],
          y: coordinatesArray[1],
        },
        wenda: {
          x: coordinatesArray[2],
          y: coordinatesArray[3],
        },
        wizard: {
          x: coordinatesArray[4],
          y: coordinatesArray[5],
        },
        odlaw: {
          x: coordinatesArray[6],
          y: coordinatesArray[7],
        },
      },
    });

    await level.save();
    return res.json({
      message: 'Level created successfully.',
    });
  }),
];

exports.get_levels_count = asyncHandler(async (req, res, next) => {
  const levelsCount = await Level.countDocuments({}).lean().exec();
  return res.json(levelsCount);
});
