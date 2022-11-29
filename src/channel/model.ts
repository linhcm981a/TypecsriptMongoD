import mongoose, { Schema, Model, Document } from 'mongoose';
import { StatusChannelEnum } from './enums';
import { IChannel } from './interfaces';

const collectionName = 'channels';

export type ChannelDocument = IChannel & Document;

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      sparse: true
    },
    description: {
      type: String
    },
    avatar: {
      type: String
    },
    icon: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(StatusChannelEnum),
      default: StatusChannelEnum.ACTIVATED
    },
    createdBy: {
      type: String,
      required: true
    },
    editedBy: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// Creating custom index
ChannelSchema.index({
  id: 1,
  status: 1,
  name: 1
}); // schema level

export const ChannelModel: Model<ChannelDocument & Document> = mongoose.model(
  collectionName,
  ChannelSchema
);
