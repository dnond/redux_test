import { ToDo } from "./entities"

export const createRepository = () => {
  let inMemoryToDos: ToDo[]

  const init = (initialToDos: ToDo[]) => {
    inMemoryToDos = initialToDos
  }

  const getAll = () => {
    return Promise.resolve(inMemoryToDos)
  }

  return { init, getAll }
}
