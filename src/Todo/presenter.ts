import { ITodo, IGetListTodoResponse } from './interfaces';

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

export const mapListTodoResponse = (result: IGetListTodoResponse): any => {
  result.items = result.items.map(document => mapBaseTodo(document));
  return result;
};

export const mapGetTodoDetailResponse = (result: ITodo): any => {
  return mapBaseTodo(result);
};
