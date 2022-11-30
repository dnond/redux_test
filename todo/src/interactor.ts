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

  const deleteToDo = async (deleteToDoId: number) => {
    repository.deleteToDo(deleteToDoId);
  }

  return { getAll, addToDo, deleteToDo };
};

export type TodoInteractor = ReturnType<typeof createToDoInteractor>;
