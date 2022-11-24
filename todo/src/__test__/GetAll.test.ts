import { describe, expect, it } from 'vitest'
import { ToDo } from '../entities'
import { createToDoInteractor } from '../interactor'
import { createStore, getAll, selectToDos } from '../store'

describe('Get All Todo List Test', () => {
  it('get todo list', async () => {
    const steps = createSteps()

    steps.givenTodoList([
      {
        id: 1,
        name: 'hoge',
        complete: false
      },
      {
        id: 2,
        name: 'hoge',
        complete: false
      },
      {
        id: 3,
        name: 'hoge',
        complete: false
      }
    ])
    await steps.whenUserGetAllTodoList()
    steps.thenGettedTodoAre([
      {
        id: 1,
        name: 'hoge',
        complete: false
      },
      {
        id: 2,
        name: 'hoge',
        complete: false
      },
      {
        id: 3,
        name: 'hoge',
        complete: false
      }
    ])
  })
})


const createSteps = () => {
  const repository = createRepository()
  const store = createStore(repository)

  const givenTodoList = (initialToDos: ToDo[]) => {
    repository.init(initialToDos)
  }
  const whenUserGetAllTodoList = async () => {
    const test = await store.dispatch(getAll)
    console.log(test);

  }
  const thenGettedTodoAre = (expectedTodos: ToDo[]) => {
    expect(selectToDos(store.getState())).toEqual(expectedTodos)
  }

  return { givenTodoList, whenUserGetAllTodoList, thenGettedTodoAre }
}

const createRepository = () => {
  let inMemoryToDos: ToDo[]

  const init = (initialToDos: ToDo[]) => {
    inMemoryToDos = initialToDos
  }

  const getAll = () => {
    return Promise.resolve(inMemoryToDos)
  }

  return { init, getAll }
}

const createTodosPresenter = () => {
  let todos: ToDo[]

  const set = (newTodos: ToDo[]) => {
    todos = newTodos
  }

  const get = () => todos

  return { get, set }
}


