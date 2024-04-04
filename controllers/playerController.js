const Player = require('../models/Player');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get_all_players = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});

exports.post_create_player = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});

exports.get_players_count = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});

exports.get_latest_player = asyncHandler(async (req, res, next) => {
  return res.json({
    status: 'TODO',
  });
});
