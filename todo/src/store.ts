import {
  configureStore,
  combineReducers,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { TodoInteractor, createToDoInteractor } from "./interactor";
import { ToDo } from "./entities";
import { TodoRepository } from "./ports";

export const getAll = createAsyncThunk<ToDo[], void, { extra: TodoInteractor }>(
  "getAll",
  async (_, { extra }) => {
    return extra.getAll();
  }
);
export const addTodo = createAsyncThunk<
  ToDo[],
  string,
  { extra: TodoInteractor }
>("addTodo", async (toDo, { extra }) => {
  extra.addToDo(toDo);
  return extra.getAll();
});

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
  },
});

const reducer = combineReducers({
  [todoSlice.name]: todoSlice.reducer,
});

type State = ReturnType<typeof reducer>;

export const createStore = (repository: TodoRepository) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        thunk: { extraArgument: createToDoInteractor(repository) },
      });

      return middleware;
    },
  });

export const selectToDos = (state: State) => {
  return state.todoSlice.todos;
};

export type Dispatch = ReturnType<typeof createStore>["dispatch"];
