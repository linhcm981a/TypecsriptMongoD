import { IUser } from './interfaces';
import { UserDocument, UserModel } from './model';
import logger from '../logger';
import { IUserToBeCreated } from './interfaces';

export const documentToObject = (document: UserDocument) => {
  const user = document.toObject({ getters: true }) as any;
  delete user['password'];
  delete user['salt'];

  return user as IUser;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne({ email });
    return user && documentToObject(user);
  } catch (error) {
    logger.error('Find User DB Error>>>', error);
    throw error;
  }
};

export const createUser = async (payload: IUserToBeCreated): Promise<any> => {
  try {
    const user = await UserModel.create(payload);
    return user && documentToObject(user);
  } catch (error) {
    logger.error('Create User DB Error>>>', error);
    throw error;
  }
};
