const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import { UserModel } from '../user/model';

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

export const issueToken = (payload: any) =>
  jwt.sign(payload, secret, { expiresIn: 10 * 24 * 3600 * 1000 * 1000 });

export const verifyToken = async (decoded: any) => {
  if (!decoded['id']) {
    return { isValid: false };
  } else {
    const user = await UserModel.findOne({ _id: decoded['id'] });
    if (!user) return { isValid: false };
    return { isValid: true };
  }
};
