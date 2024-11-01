import type { NextFunction, Request, Response } from 'express';
import Player from '../models/Player';

import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import { isEndGreaterThanStart, isTime } from '../config/helpers';

export const getAllPlayers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPlayers = await Player.find({}, '-__v')
      .populate('level', '-__v')
      .sort({ duration: 1, hints_used: -1 })
      .lean()
      .exec();
    if (!allPlayers.length) {
      res.json({
        message: 'No leaderboard entries found.',
      });
      return;
    }
    res.json(allPlayers);
    return;
  }
);

export const createPlayer = [
  // Check nickname field and other data
  body('nickname', 'Nickname field must contain between 1 and 16 characters')
    .trim()
    .isString()
    .isLength({ min: 1, max: 16 }),
  body('level', 'Incorrect level ID').isMongoId(),
  body('start').custom(isTime),
  body('end').custom(isTime).custom(isEndGreaterThanStart),
  body('hints_used', 'Value must be either true or false').isBoolean(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    // Return error if something's wrong
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'There is something wrong with the record or the server.',
      });
      return;
    }

    const nickname = req.body.nickname;
    const startDate = new Date(parseInt(req.body.start));
    const endDate = new Date(parseInt(req.body.end));
    const level = req.body.level;
    const hintsUsed = req.body.hints_used;
    const duration = (endDate.getTime() - startDate.getTime()) / 1000;

    // Return error if duration is shorter than 7 seconds
    if (duration < 7) {
      res.status(400).json({
        message: 'There is something wrong with the record or the server.',
      });
      return;
    }

    const player = {
      nickname: nickname,
      level: level,
      start_date: startDate,
      end_date: endDate,
      duration: duration,
      hints_used: hintsUsed,
    };

    await new Player(player).save();

    res.json({
      message: 'Record added successfully!',
    });
    return;
  }),
];

export const getPlayersCount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const playersCount = await Player.countDocuments({}).lean().exec();
    res.json(playersCount);
    return;
  }
);

export const getLatestPlayer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const latestPlayer = await Player.findOne({}, '-__v')
      .sort({ end_date: -1 })
      .lean()
      .exec();
    res.json(latestPlayer);
    return;
  }
);
