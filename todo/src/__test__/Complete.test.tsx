import { ToDo } from "../entities"
import { createToDoRepository, createToDosRepository } from "../repository"
import { createStore, complete, selectToDos, getAll } from "../store"

describe('complete todo', () => {
  it('should complete todo', async () => {
    const steps = createSteps()

    await steps.givenTodo({
      id: 1,
      name: 'hoge',
      complete: false
    })
    await steps.whenCompleteTodo(true)
    steps.thenCompleteTodoIs(true)
  })
})

const createSteps = () => {
  const repository = createToDoRepository()
  const toDosRepository = createToDosRepository()
  const store = createStore(toDosRepository, repository)
  let id : number

  const givenTodo = async (initialToDo: ToDo) => {
    id = initialToDo.id
    repository.init(initialToDo)
    toDosRepository.init([initialToDo])
    await store.dispatch(getAll())
  }
  const whenCompleteTodo = async (completed: boolean) => {
    await store.dispatch(complete(completed))
  }
  const thenCompleteTodoIs = (expectedComplete: boolean) => {    
    const todo = selectToDos(store.getState()).find(todo => todo.id === id)
    expect(todo?.complete).toBe(expectedComplete)
  }

  return { givenTodo, whenCompleteTodo, thenCompleteTodoIs }
}
