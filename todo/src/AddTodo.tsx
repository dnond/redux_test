import { FC, useCallback, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo, Dispatch } from './store'

export const AddTodo:FC = () => {
  const dispatch = useDispatch<Dispatch>()
  const [newTodoName, setNewTodoName] = useState('')

  const onInput = useCallback((event: FormEvent<HTMLInputElement> & {target: {value: string}}) => {
    setNewTodoName(event.target.value)
  }, [])
  
  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addTodo(newTodoName))
  }, [newTodoName, dispatch])

  return (
    <form onSubmit={onSubmit}>
      <label>新しいTODO
        <input type="text" value={newTodoName} onInput={onInput}/>
      </label>
      <button type="submit">追加</button>
    </form>
  )
}