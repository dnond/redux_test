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
      { id: Math.random(), complete: false, name: toDoName },
    ];
    return Promise.resolve();
  };

  const deleteToDo = (deleteToDoId: number) => {
    inMemoryToDos = inMemoryToDos.filter(({ id }) => {
      return id !== deleteToDoId
    });
    return Promise.resolve();
  }

  const setComplete = (complete: boolean, toDoId: number) => {
    inMemoryToDos = inMemoryToDos.map((toDo) => {
      return toDo.id === toDoId ? { ...toDo, complete: complete } : toDo
    })

    return Promise.resolve();
  }

  const getOne = (toDoId: number) => {
    return Promise.resolve(inMemoryToDos.find((toDo) => { return toDo.id === toDoId }));
  }


  return { init, getAll, addToDo, deleteToDo, setComplete, getOne };
};