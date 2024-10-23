import type { Meta } from 'express-validator';

// Check if start/end is a valid time
export const isTime = (value: string) => {
  const field = new Date(parseInt(value));
  if (!field.valueOf()) {
    throw new Error('Field is not a valid date object');
  }
  return true;
};

// Check if end is greater than start
export const isEndGreaterThanStart = (value: string, meta: Meta) => {
  const req = meta.req;
  if (value > req.body.start) {
    return true;
  }
  throw new Error('End is not greater than start');
};

// Check for production environment
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};
