import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToDo } from '../entities'
import { createRepository } from '../repository'
import { createStore, selectToDos } from '../store'
import { TodoListContainer } from '../TodoListContainer'

describe('add todo', () => {
  it('should add todo', async () => {
    const steps = createSteps()

    steps.givenTodoList([{
      id: 1,
      name: 'hoge',
      complete: false
    }, {
      id: 2,
      name: 'hoge',
      complete: false
    }, {
      id: 3,
      name: 'hoge',
      complete: false
    }])
    
    await steps.whenAddTodoList('added')
    
    await steps.thenTodoListIs([
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
      },
      {
        id: 4,
        name: 'added',
        complete: false
      }
    ])
  })
})

const createSteps = () => {
  const repository = createRepository()
  const store = createStore(repository)

  const givenTodoList = (initialToDoList: ToDo[]) => {
    repository.init(initialToDoList)
    render(<TodoListContainer repository={repository}/>)
  }

  const whenAddTodoList = async (addedToDoName: string) => {
    const input = await screen.findByRole('textbox', {name: '新しいTODO'})
    const confirmButton = await screen.findByRole('button', {name: '追加'})
    await userEvent.type(input, addedToDoName)
    await userEvent.click(confirmButton)
  }

  const thenTodoListIs = async (expectedTodoList: ToDo[]) => {
    const listItems = await screen.findAllByRole('listitem')

    expect(listItems[0]).toHaveTextContent(expectedTodoList[0].name)
    expect(listItems[1]).toHaveTextContent(expectedTodoList[1].name)
    expect(listItems[2]).toHaveTextContent(expectedTodoList[2].name)
    expect(listItems[3]).toHaveTextContent(expectedTodoList[3].name)  
  }

  return { givenTodoList, whenAddTodoList, thenTodoListIs }
}