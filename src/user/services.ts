import { IRegisterPayload } from './interfaces';
import * as repo from './repo';
import logger from '../logger';
import { AppError } from '../common/appError';
import { ERROR_CODE } from '../enums/error';
import { saltHashPassword } from '../services/bcrypt';
import { issueToken } from '../services/auth';

export const register = async ({
  name,
  email,
  password
}: IRegisterPayload): Promise<any> => {
  const isEmailExisted = await repo.getUserByEmail(email);
  if (isEmailExisted) {
    logger.error(`Email registered>>>`, email);
    throw new AppError(ERROR_CODE.EMAIL_EXISTS);
  }

  const { passwordHash, salt } = saltHashPassword(password);
  const user = await repo.createUser({
    name: name,
    email: email,
    password: passwordHash,
    salt
  });
  logger.error(`user success>>>`, user);
  const token = issueToken({
    id: user.id,
    mame: user.name,
    email: user.email
  });
  logger.error(` token success>>>`, token);

  return { token, user };
};
