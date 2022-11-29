import mongoose, { Schema, Model, Document } from 'mongoose';
import { ITodo } from './interfaces';

const collectionName = 'todos';

export type TodoDocument = ITodo & Document;

const TodoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      sparse: true
    },
    description: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// Creating custom index
TodoSchema.index({
  id: 1,
  status: 1,
  name: 1
}); // schema level

export const TodoModel: Model<TodoDocument & Document> = mongoose.model(
  collectionName,
  TodoSchema
);
