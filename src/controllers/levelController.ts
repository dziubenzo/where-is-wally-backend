import type { NextFunction, Request, Response } from 'express';
import type { LevelType } from '../models/Level';
import Level from '../models/Level';

import asyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import { LEVELS_COUNT } from '../config/constants';

export const getAllLevels = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allLevels = await Level.find({}).lean().exec();
    if (!allLevels.length) {
      res.json({
        message: 'No levels found.',
      });
      return;
    }
    res.json(allLevels);
    return;
  }
);

export const createLevel = [
  // Check password
  body('password').custom((value) => {
    return value === process.env.PASSWORD ? true : false;
  }),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    // Return error if password incorrect
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'No way Jose!',
      });
      return;
    }

    const name: string = req.body.name;
    const image_url: string = req.body.image_url;
    const coordinatesArray: number[] = JSON.parse(req.body.coordinates);
    const url_parameter = (await Level.countDocuments({}).lean().exec()) + 1;

    const level: LevelType = {
      url_parameter: url_parameter,
      name: name,
      image_url: image_url,
      characters: [
        {
          name: 'wally',
          x: coordinatesArray[0],
          y: coordinatesArray[1],
        },
        {
          name: 'wenda',
          x: coordinatesArray[2],
          y: coordinatesArray[3],
        },
        {
          name: 'wizard',
          x: coordinatesArray[4],
          y: coordinatesArray[5],
        },
        {
          name: 'odlaw',
          x: coordinatesArray[6],
          y: coordinatesArray[7],
        },
      ],
    };

    await new Level(level).save();

    res.json({
      message: 'Level created successfully.',
    });
    return;
  }),
];

export const getLevel = [
  // Make sure the parameter is an integer and is in the range of 1 to LEVELS_COUNT
  param('urlParameter')
    .isInt()
    .custom((value) => value >= 1 && value <= LEVELS_COUNT),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'Invalid URL parameter',
      });
      return;
    }

    const url_parameter = req.params.urlParameter;
    const level = await Level.findOne({ url_parameter }).lean().exec();
    res.json(level);
    return;
  }),
];

export const getLevelsCount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const levelsCount = await Level.countDocuments({}).lean().exec();
    res.json(levelsCount);
    return;
  }
);
