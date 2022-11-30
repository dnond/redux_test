import { ToDo } from "./entities";
import { TodoListContainer } from "./TodoListContainer";

export const createRepository = () => {
  let inMemoryToDos: ToDo[];

  const init = (initialToDos: ToDo[]) => {
    inMemoryToDos = initialToDos;
  };

  const getAll = () => {
    return Promise.resolve(inMemoryToDos);
  };

  const addToDo = (toDoName: string) => {
    inMemoryToDos = [
      ...inMemoryToDos,
      { id: inMemoryToDos.length + 1, complete: false, name: toDoName },
    ];
    return Promise.resolve();
  };

  const deleteToDo = (deleteToDoId: number) => {
    inMemoryToDos = inMemoryToDos.filter(({ id }) => {
      return id !== deleteToDoId
    });
    return Promise.resolve();
  }

  return { init, getAll, addToDo, deleteToDo };
};
