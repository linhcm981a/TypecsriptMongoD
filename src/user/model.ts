import mongoose, { Schema, Model, Document } from 'mongoose';
import { IUser } from './interfaces';

const collectionName = 'users';

export type UserDocument = IUser & Document;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      index: true,
      sparse: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// Creating custom index
UserSchema.index({
  id: 1,
  status: 1,
  email: 1
}); // schema level

export const UserModel: Model<UserDocument & Document> = mongoose.model(
  collectionName,
  UserSchema
);
