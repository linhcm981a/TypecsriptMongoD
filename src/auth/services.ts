import logger from '../logger';
import * as repo from '../user/repo';
import { sha512 } from '../services/bcrypt';
import { issueToken } from '../services/auth';
import { AppError } from '../common/appError';
import { ERROR_CODE } from '../enums/error';

export const login = async (email: string, password: string) => {
  const user = await repo.getAuthByEmail(email);
  if (!user) {
    logger.error('User not found: ', email);
  }

  const salt = user?.salt || '';

  if (sha512(password, salt).passwordHash != user?.password) {
    logger.error(`Password invalid`);
    throw new AppError(ERROR_CODE.EMAIL_OR_PASSWORD_INCORRECT);
  }

  const token = issueToken({
    id: user.id,
    name: user.name,
    email: user.email
  });
  delete user.password;
  delete user.salt;

  return {
    token,
    user
  };
};
