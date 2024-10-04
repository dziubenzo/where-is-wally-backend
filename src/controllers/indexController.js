const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  return res.json({
    project: "Where's Wally",
    author: 'dziubenzo',
  });
});
