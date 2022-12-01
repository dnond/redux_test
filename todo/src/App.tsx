import { createToDosRepository } from "./repository"
import { TodoListContainer } from "./TodoListContainer"

const repository = createToDosRepository()
repository.init([{id: 1, name: 'hoge', complete: true}])

export const App = () => {
  return <TodoListContainer repository={repository}/>
}