import {
  configureStore,
  combineReducers,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ToDosInteractor, createToDosInteractor } from "./interactor";
import { ToDo } from "./entities";
import { TodosRepository, createToDoPresenter } from "./ports";

export const getAll = createAsyncThunk<ToDo[], void, { extra: ToDosInteractor }>(
  "getAll",
  async (_, { extra }) => {
    return extra.getAll();
  }
);
export const addTodo = createAsyncThunk<
  ToDo[],
  string,
  { extra: ToDosInteractor }
>("addTodo", async (toDo, { extra }) => {
  extra.addToDo(toDo);
  return extra.getAll();
});
export const deleteTodo = createAsyncThunk<
  ToDo[],
  number,
  { extra: ToDosInteractor }
>("deleteTodo", async (deleteToDoId, { extra }) => {
  extra.deleteToDo(deleteToDoId);
  return extra.getAll();
})
export const complete = createAsyncThunk<
  ToDo,
  { complete: boolean, completeToDoId: number },
  { extra: ToDosInteractor & { getOne: (completeToDoId: number) => ToDo } }
>("complete", async (payload, { extra }) => {
  await extra.complete(payload.complete, payload.completeToDoId);
  return extra.getOne(payload.completeToDoId);
})


const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: [] as ToDo[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.todos = payload;
    });

    builder.addCase(addTodo.fulfilled, (state, { payload }) => {
      state.todos = payload;
    });

    builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
      state.todos = payload;
    });

    builder.addCase(complete.fulfilled, (state, { payload }) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === payload.id ? payload : todo
      })
    })
  },
});

const reducer = combineReducers({
  [todoSlice.name]: todoSlice.reducer,
});

type State = ReturnType<typeof reducer>;

export const createStore = (repository: TodosRepository) => {
  const presenter = createToDoPresenter()
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        thunk: {
          extraArgument: {
            ...createToDosInteractor(repository, presenter),
            getOne: presenter.get
          }
        },
      });

      return middleware;
    },
  });
}

export const selectToDos = (state: State) => {
  return state.todoSlice.todos;
};

export type Dispatch = ReturnType<typeof createStore>["dispatch"];
