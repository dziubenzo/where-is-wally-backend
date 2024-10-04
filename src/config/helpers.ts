import type { Request } from 'express';

// Check if start/end is a valid time
export const isTime = (value: string) => {
  const field = new Date(parseInt(value));
  if (!field.valueOf()) {
    throw new Error('Field is not a valid date object');
  }
  return true;
};

// Check if end is greater than start
export const isEndGreaterThanStart = (
  value: string,
  { req }: { req: Request }
) => {
  if (value > req.body.start) {
    return true;
  }
  throw new Error('End is not greater than start');
};
