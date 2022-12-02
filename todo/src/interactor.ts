import { ToDoPresenter, TodosRepository } from "./ports";
import { ToDo } from "./entities";

export const createToDosInteractor = (repository: TodosRepository, presenter: ToDoPresenter) => {
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

  const complete = async (completed: boolean, completeToDoId: number) => {
    await repository.setComplete(completed, completeToDoId)
    const toDo = await repository.getOne(completeToDoId)
    if (toDo) {
      presenter.set(toDo)
    } else {
      throw "ToDo not found"
    }
  }


  return { getAll, addToDo, deleteToDo, complete };
};

export type ToDosInteractor = ReturnType<typeof createToDosInteractor>;
