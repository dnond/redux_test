import { getAll, selectToDos, Dispatch } from './store'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const TodoList: FC = () => {
  const dispatch = useDispatch<Dispatch>()
  const todos = useSelector(selectToDos)
  useEffect(() => {
    dispatch(getAll())
  }, [])

  return <ul>{todos.map((todo) => {
    return <li key={todo.id}>{todo.name}</li>
  })}</ul>
}
