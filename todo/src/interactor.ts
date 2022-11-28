import { TodoRepository } from "./ports";
import { ToDo } from "./entities";

export const createToDoInteractor = (repository: TodoRepository) => {
  const getAll = async () => {
    const newTodos = await repository.getAll();
    return newTodos;
  };

  const addToDo = async (toDoName: string) => {
    repository.addToDo(toDoName);
  };

  return { getAll, addToDo };
};

export type TodoInteractor = ReturnType<typeof createToDoInteractor>;
