import { ToDo } from "./entities";

export const createToDosRepository = () => {
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

export const createToDoRepository = () => {
  let inMemoryToDo: ToDo;

  const init = (initialToDo: ToDo) => {
    inMemoryToDo = initialToDo
  }

  const setComplete = (complete: boolean) => {
    inMemoryToDo = { ...inMemoryToDo, complete: complete }
    return Promise.resolve();
  }

  const getOne = () => {
    return Promise.resolve(inMemoryToDo);
  }

  return { init, setComplete, getOne }
}