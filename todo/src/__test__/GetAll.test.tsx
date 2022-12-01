import { ToDo } from '../entities'
import { render, screen } from '@testing-library/react'
import { TodoListContainer } from '../TodoListContainer'
import { createToDosRepository } from '../repository'

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
  const repository = createToDosRepository()
  let listItems : HTMLElement[]

  const givenTodoList = (initialToDos: ToDo[]) => {
    repository.init(initialToDos)
    render(<TodoListContainer repository={repository}/>)
  }

  const whenUserGetAllTodoList = async () => {
    listItems = await screen.findAllByRole('listitem')
  }

  const thenGettedTodoAre = (expectedTodos: ToDo[]) => {
    expect(listItems[0]).toHaveTextContent(expectedTodos[0].name)
    expect(listItems[1]).toHaveTextContent(expectedTodos[1].name)
    expect(listItems[2]).toHaveTextContent(expectedTodos[2].name)

  }

  return { givenTodoList, whenUserGetAllTodoList, thenGettedTodoAre }
}
