import { createRepository } from "./repository"
import { TodoListContainer } from "./TodoListContainer"

const repository = createRepository()
repository.init([{id: 1, name: 'hoge', complete: true}])

export const App = () => {
  return <TodoListContainer repository={repository}/>
}