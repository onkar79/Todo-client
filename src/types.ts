export type DefaultLoadingStatus = 'not loaded' | 'loading' | 'loaded' | 'error';

export type DefaultLoadingState = {
  loading: DefaultLoadingStatus;
  error?: string;
}

export type Todo = {
  id: number | string;
  date: number;
  text: string;
  completed: boolean;
};
export type  TodoListProps =   DefaultLoadingState & {
  todos: Array<Todo>;
}
