import { ToDo } from "./entities";

export interface TodosRepository {
  getAll: () => Promise<ToDo[]>;
  addToDo: (toDoName: string) => Promise<void>;
  deleteToDo: (deleteToDoId: number) => Promise<void>;
  setComplete: (complete: boolean, completeToDoId: number) => Promise<void>;
  getOne: (completeToDoId: number) => Promise<ToDo | undefined>;
}
export interface ToDoPresenter {
  get: () => ToDo;
  set: (newToDo: ToDo) => void;
}

export const createToDoPresenter = () => {
  let toDo: ToDo

  const get = () => {
    return toDo
  }

  const set = (newToDo: ToDo) => {
    toDo = newToDo
  }

  return { get, set }
}