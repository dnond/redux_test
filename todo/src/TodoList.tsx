import { getAll, selectToDos, Dispatch, deleteTodo } from './store'
import { FC, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToDo } from './entities'

export const TodoList: FC = () => {
  const dispatch = useDispatch<Dispatch>()
  const todos = useSelector(selectToDos)

  useEffect(() => {
    dispatch(getAll())
  }, [])

  return <ul>{todos.map((todo) => {
    return <ToDoItem todo={todo} />
  })}</ul>
}

const ToDoItem:FC<{todo: ToDo}> = ({todo}) => {
  const dispatch = useDispatch<Dispatch>()
  const onClick = useCallback(
    () => {
      dispatch(deleteTodo(todo.id))},
    []
  )
  return <li key={todo.id}>
    {todo.name}
    <button type="button" onClick={onClick}>削除</button>
  </li>
}