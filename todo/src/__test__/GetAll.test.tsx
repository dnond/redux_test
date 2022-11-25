import { ToDo } from '../entities'
import { render, screen } from '@testing-library/react'
import { TodoListContainer } from '../TodoListContainer'
import { createRepository } from '../repository'

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
  let listItems : HTMLElement[]

  const givenTodoList = (initialToDos: ToDo[]) => {
    repository.init(initialToDos)
    render(<TodoListContainer repository={repository}/>)
  }

  const whenUserGetAllTodoList = async () => {
    listItems = await screen.findAllByRole('listitem')
  }

  const thenGettedTodoAre = (expectedTodos: ToDo[]) => {
    expect(listItems[0]).toHaveTextContent('hoge')
    expect(listItems[1]).toHaveTextContent('hoge')
    expect(listItems[2]).toHaveTextContent('hoge')

  }

  return { givenTodoList, whenUserGetAllTodoList, thenGettedTodoAre }
}
