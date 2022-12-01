import { ToDoPresenter, TodoRepository, TodosRepository } from "./ports";
import { ToDo } from "./entities";

export const createToDosInteractor = (repository: TodosRepository) => {
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

export type ToDosInteractor = ReturnType<typeof createToDosInteractor>;

export const createToDoInteractor = (repository: TodoRepository, presenter: ToDoPresenter) => {
  const complete = async (completed: boolean) => {
    await repository.setComplete(completed)
    const toDo = await repository.getOne()
    presenter.set(toDo)
  }

  return { complete }
}

export type ToDoInteractor = ReturnType<typeof createToDoInteractor>;