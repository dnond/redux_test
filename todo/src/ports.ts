import { ToDo } from "./entities"

export interface TodoRepository {
  getAll: () => Promise<ToDo[]>
}

export interface TodosPresenter {
  set: (newTodos: ToDo[]) => void
}