import { TodoRepository, TodosPresenter } from "./ports"

export const createToDoInteractor = (repository: TodoRepository) => {
  const getAll = async () => {
    const newTodos = await repository.getAll()
    return newTodos
  }

  return { getAll }
}

export type TodoInteractor = ReturnType<typeof createToDoInteractor>