import React from "react";
import TodoItem from "../todoItem/TodoItem";
import { Todo, TodoListProps } from "../../types";

const quote = "Stay positive, work hard, make it happen.";

interface TodoListProp {
  todos: Array<Todo>;
  selectedTodos: Array<Todo>;
  editTask: (task: Todo) => void;
  deleteTask: (task: Todo) => void;
  markComplete: (task: Todo) => void;
  selectMultiple: (task: Todo) => void;
}

const TodoList = ({
  todos,
  editTask,
  deleteTask,
  markComplete,
  selectedTodos,
  selectMultiple,
}: TodoListProp) => {
  return (
    <div className='mt-2 max-h-[calc(100vh-215px)] overflow-auto'>
      {todos.length ? (
        todos.map((task: Todo, idx) => {
          return (
            <TodoItem
            key={idx}
              task={task}
              editTask={editTask}
              deleteTask={deleteTask}
              markComplete={markComplete}
              selectedTodos={selectedTodos}
              selectMultiple={selectMultiple}
            />
          );
        })
      ) : (
        <div className="text-gray-500 opacity-50 mt-[150px] text-center text-l">
          <blockquote>
            <q>{`${quote}`}</q>
            <p>-anonymous</p>
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default TodoList;
