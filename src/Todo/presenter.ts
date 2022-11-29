import { ITodo } from './interfaces';

const mapBaseTodo = (data: ITodo): any => {
  return {
    id: data.id,
    name: data.name,
    description: data.description
  };
};

export const mapCreateTodoResponse = (data: ITodo): any => ({
  ...mapBaseTodo(data)
});
