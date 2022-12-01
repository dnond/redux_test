import { ToDo } from "../entities"
import { createToDosRepository } from "../repository"
import userEvent from '@testing-library/user-event'
import { createToDosInteractor } from "../interactor"
import { createStore, deleteTodo, selectToDos } from "../store"
import { TodoListContainer } from "../TodoListContainer"
import { render, screen } from "@testing-library/react"

describe('delete todo', () => {
  it('should delete todo', async () => {
    const steps = createSteps()

    steps.givenTodoList([{
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
    },])

    await steps.whenDeleteTodo(3)

    await steps.thenTodoListAre([{
      id: 1,
      name: 'hoge',
      complete: false
    },
    {
      id: 2,
      name: 'hoge',
      complete: false
    },])
  })
})

const createSteps = () => {
  const repository = createToDosRepository()
  const store = createStore(repository)
  let initialToDos: ToDo[]

  const givenTodoList = (toDos: ToDo[]) => {
    initialToDos = toDos

    repository.init(initialToDos)
    render(<TodoListContainer repository={repository}/>)
  }

  const whenDeleteTodo = async (deleteToDoId: number) => {
    const deleteButtons = await screen.findAllByRole('button', {name: '削除'})
    const deleteIndex = initialToDos.findIndex(({id}) => {
      return id === deleteToDoId
    })

    const deleteButton = deleteButtons[deleteIndex]
    await userEvent.click(deleteButton)
  }

  const thenTodoListAre = async (expectedTodoList: ToDo[]) => {
    const listItems = await screen.findAllByRole('listitem')

    expect(listItems[0]).toHaveTextContent(expectedTodoList[0].name)
    expect(listItems[1]).toHaveTextContent(expectedTodoList[1].name)
    expect(listItems).toHaveLength(expectedTodoList.length)
  }

  return {givenTodoList, whenDeleteTodo, thenTodoListAre}
}

