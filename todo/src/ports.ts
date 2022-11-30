import { ToDo } from "./entities";

export interface TodoRepository {
  getAll: () => Promise<ToDo[]>;
  addToDo: (toDoName: string) => void;
  deleteToDo: (deleteToDoId: number) => void;
}
