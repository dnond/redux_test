import { ToDo } from "./entities";

export interface TodosRepository {
  getAll: () => Promise<ToDo[]>;
  addToDo: (toDoName: string) => Promise<void>;
  deleteToDo: (deleteToDoId: number) => Promise<void>;
}

export interface TodoRepository {
  setComplete: (complete: boolean) => Promise<void>;
  getOne: () => Promise<ToDo>;
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
    console.log('set', toDo)
    toDo = newToDo
    console.log('set', toDo)
  }

  return { get, set }
} 