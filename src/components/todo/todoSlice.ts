import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Todo, TodoListProps } from "../../types";
import { getTodosApiUrl,updateTodosApiUrl,deleteTodosApiUrl,addTodosApiUrl } from "../../api/routes";

// The code below is how a real world async thunk would look like

export const getTodos = createAsyncThunk<Todo[]>(
  "todos/get",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    const response = await fetch(getTodosApiUrl, { signal });
    const data = await response.json();
    if (response.status !== 200) {
      return rejectWithValue(data as string);
    }

    return data as Todo[];
  }
);
export const addNewTodo = createAsyncThunk<Todo[],Todo>(
  "todos/add",
  async (arg:Todo, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    const response = await fetch(addTodosApiUrl, { 
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
     });

    const data = await response.json();

    if (response.status !== 200) {
      return rejectWithValue(data as string);
    }

    return data as Todo[];
  }
);

export const updateTodo = createAsyncThunk<
  Todo[],
  Todo
>("todos/update", async (arg: Todo, thunkApi) => {
  const { rejectWithValue, signal } = thunkApi;

  const response = await fetch(updateTodosApiUrl, {
    method: "PUT",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await response.json();
  if (response.status !== 200) {
    return rejectWithValue(data as string);
  }
  return data as Todo[];
});

export const deleteTodo = createAsyncThunk<
  Todo[],
  Todo
>("todos/delete", async (arg: Todo, thunkApi) => {
  const { rejectWithValue, signal } = thunkApi;

  const response = await fetch(deleteTodosApiUrl, {
    method: "DELETE",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await response.json();
  if (response.status !== 200) {
    return rejectWithValue(data as string);
  }
  return data as Todo[];
});

const initialState: TodoListProps = {
  todos: [],
  loading: "not loaded",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = "error";
        state.error = (action.payload as string) ?? action.error.message;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.todos = action.payload;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = "error";
        state.error = (action.payload as string) ?? action.error.message;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.todos = action.payload;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = "error";
        state.error = (action.payload as string) ?? action.error.message;
      })
      .addCase(addNewTodo.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.todos = action.payload;
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.loading = "error";
        state.error = (action.payload as string) ?? action.error.message;
      })
      ;
  },
});

export const todoSliceReducer = todosSlice.reducer;
export const todosSelector = (state: RootState) => state.todos;
