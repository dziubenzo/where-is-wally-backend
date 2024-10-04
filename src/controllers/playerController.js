const Player = require('../models/Player');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { isTime, isEndGreaterThanStart } = require('../config/helpers');

exports.get_all_players = asyncHandler(async (req, res, next) => {
  const allPlayers = await Player.find({})
    .populate('level')
    .sort({ duration: 1, hints_used: -1 })
    .lean()
    .exec();
  if (!allPlayers.length) {
    return res.json({
      message: 'No leaderboard entries found.',
    });
  }
  return res.json(allPlayers);
});

exports.post_create_player = [
  // Check nickname field and other data
  body('nickname', 'Nickname field must contain between 1 and 16 characters')
    .trim()
    .isLength({ min: 1, max: 16 }),
  body('level', 'Incorrect level ID').isMongoId(),
  body('start').custom(isTime),
  body('end').custom(isTime).custom(isEndGreaterThanStart),
  body('hints_used', 'Value must be either true or false').isBoolean(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Return error if something's wrong
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'There is something wrong with the record or the server.',
      });
    }

    const nickname = req.body.nickname;
    const startDate = new Date(parseInt(req.body.start));
    const endDate = new Date(parseInt(req.body.end));
    const level = req.body.level;
    const hintsUsed = req.body.hints_used;
    const durationInSec = (endDate - startDate) / 1000;
    const duration = durationInSec.toFixed(2);

    // Return error if duration is shorter than 5 seconds
    if (duration < 5.0) {
      return res.status(400).json({
        message: 'There is something wrong with the record or the server.',
      });
    }

    const player = new Player({
      nickname: nickname,
      level: level,
      start_date: startDate,
      end_date: endDate,
      duration: duration,
      hints_used: hintsUsed,
    });

    await player.save();

    return res.json({
      message: 'Record added successfully!',
    });
  }),
];

exports.get_players_count = asyncHandler(async (req, res, next) => {
  const playersCount = await Player.countDocuments({}).lean().exec();
  return res.json(playersCount);
});

exports.get_latest_player = asyncHandler(async (req, res, next) => {
  const latestPlayer = await Player.findOne()
    .sort({ end_date: -1 })
    .lean()
    .exec();
  return res.json(latestPlayer);
});
