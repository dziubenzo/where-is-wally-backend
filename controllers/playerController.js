const Player = require('../models/Player');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get_all_players = asyncHandler(async (req, res, next) => {
  const allPlayers = await Player.find({}).lean().exec();
  if (!allPlayers.length) {
    return res.json({
      message: 'No leaderboard entries found.',
    });
  }
  return res.json(allPlayers);
});

exports.post_create_player = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});

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
