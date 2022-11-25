import { createStore } from './store'
import { TodoRepository } from './ports'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { TodoList } from './TodoList'

export const TodoListContainer:FC<{repository: TodoRepository}> = ({repository}) => {
  const store = createStore(repository)

  return <Provider store={store}>
    <TodoList />
  </Provider>
}