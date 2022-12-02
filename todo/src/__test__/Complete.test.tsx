import { ToDo } from "../entities"
import { createToDosRepository } from "../repository"
import { createStore, complete, selectToDos, getAll } from "../store"
import { render, screen } from "@testing-library/react"
import { TodoListContainer } from "../TodoListContainer"
import userEvent from '@testing-library/user-event'

describe('complete todo', () => {
  it('should complete todo', async () => {
    const steps = createSteps()

    await steps.givenTodo({
      id: 1,
      name: 'hoge',
      complete: false
    })
    await steps.whenCompleteTodo()
    await steps.thenCompleteTodoIs(true)
  })
})

const createSteps = () => {
  const toDosRepository = createToDosRepository()
  const store = createStore(toDosRepository)
  let id : number

  const givenTodo = async (initialToDo: ToDo) => {
    id = initialToDo.id
    toDosRepository.init([initialToDo])
    await store.dispatch(getAll())

    render(<TodoListContainer repository={toDosRepository}/>)
  }
  const whenCompleteTodo = async () => {
    const checkBox = await screen.findByRole('checkbox')
    await userEvent.click(checkBox)
  }
  const thenCompleteTodoIs = async (expectedComplete: boolean) => {
    const checkBox = await screen.findByRole('checkbox')
    if(expectedComplete){
      expect(checkBox).toBeChecked()
    }else{
      expect(checkBox).not.toBeChecked()
    }
  }

  return { givenTodo, whenCompleteTodo, thenCompleteTodoIs }
}
