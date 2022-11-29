const jwt = require('jsonwebtoken');

const secret = process.env.EMPLOYEE_JWT_SECRET_KEY;

export const issueToken = (payload: any) =>
  jwt.sign(payload, secret, { expiresIn: 10 * 24 * 3600 * 1000 * 1000 });
