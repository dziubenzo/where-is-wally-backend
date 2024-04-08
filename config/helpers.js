// Check if start/end is a valid time
exports.isTime = (value) => {
  const field = new Date(parseInt(value));
  if (isNaN(field)) {
    throw new Error('Field is not a valid date object');
  }
  return true;
};

// Check if end is greater than start
exports.isEndGreaterThanStart = (value, { req }) => {
  if (value > req.body.start) {
    return true;
  }
  throw new Error('End is not greater than start');
};
