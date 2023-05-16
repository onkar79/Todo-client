import React, { useEffect, useState } from "react";
import TodoList from "../todoList/TodoList";
import { Todo } from "../../types";
import deleteIcon from "../../assets/icons/delete.png";
import editWhite from "../../assets/icons/editWhite.png";
import addWhite from "../../assets/icons/addWhite.png";
import { deleteTodo, getTodos, updateTodo,addNewTodo } from "./todoSlice";
import { useAppDispatch,useAppSelector } from "../../store/store";

let idx: Todo ;
const newDate = new Date();
const day = newDate.toLocaleDateString("locale", { weekday: "long" });
const month = newDate.toLocaleString("default", { month: "long" });
const date = newDate.getDate();

const Todos = () => {
  // const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todoInputQuery, setTodoInputQuery] = useState("");
  const [selectedTodos, setSelectedTodos] = useState<Array<Todo>>([]);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  let todos:Todo[]  = useAppSelector(state=>state.todos.todos);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoInputQuery(e.target.value);
  };
  const addTodo = () => {
    if (!todoInputQuery.trim()) return;
    if (editMode) {
      let payload = {
        ...idx, text:todoInputQuery
      }
      dispatch(updateTodo(payload))
      setEditMode(false);
    }
    else {
     let newTodo = {
      id: todos.length,
      text: todoInputQuery,
      date: Date.now(),
      completed: false,
    }
    dispatch(addNewTodo(newTodo))
    }
    setTodoInputQuery("");
  };

  const editTask = (task: Todo) => {
    setEditMode(true);
    idx = todos.find((item:Todo) => item.id === task.id)!;
    setTodoInputQuery(task.text);
  };
  const deleteTask = (task: Todo) => {
    dispatch(deleteTodo(task))
  };

  const markComplete = (task: Todo) => {

    let payload = {
      ...task, completed: !task.completed
    }
    dispatch(updateTodo(payload))
    // setTodos(
    //   todos.map((item) =>
    //     item.date === task.date ? { ...item, completed: !task.completed } : item
    //   )
    // );
  };

  const selectMultiple = (task: Todo) => {
    const isExist = selectedTodos.find((item: Todo) => item.date === task.date);

    if (isExist) {
      setSelectedTodos(
        selectedTodos.filter((item: Todo) => item.date !== task.date)
      );
    } else {
      setSelectedTodos([...selectedTodos, task]);
    }
  };

  const deleteSelectedTasks = () => {
    let arr = todos.filter((el:Todo) => !selectedTodos.includes(el));
    // setTodos(arr);
    let checkbox = document.getElementById("check_1") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

useEffect(() => {
  dispatch(getTodos())
}, [])

  return (
    <div className='w-[400px] min-h-[90vh]  shadow bg-white rounded'>
      {/* Todo Header */}
      <div className='w-auto border-b-3 p-[15px] shadow-header'>
        <div className='w-auto flex justify-between items-center mb-[10px] '>
          <h1 className='text-2xl font-bold leading-normal mt-0 mb-2 text-primary'>{`${day}, ${date} ${month}`}</h1>
          <h5 className='text-sm font-medium leading-normal mt-0 mb-2 text-slate-500'>
            {`${todos.length} Items`}
          </h5>
        </div>
        <div className='w-auto flex justify-between items-center'>
          <input
            className='outline outline-[1px] outline-primary w-4/5 h-[30px] p-1 rounded text-[12px]'
            value={todoInputQuery}
            onChange={onChangeInput}
            name='todo'
            type='text'
            placeholder='Add a task...'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
          <button
            className='px-[10px] py-[10px] border-[2px] rounded-full bg-primary text-white font-medium'
            onClick={addTodo}
          >
            {editMode ? (
              <img src={editWhite} alt='edit' className='w-[10px] h-[10px]' />
            ) : (
              <img src={addWhite} alt='add' className='w-[10px] h-[10px]' />
            )}
          </button>
        </div>
        <div className='flex justify-end pl-[10px] pt-[10px] '>
          <div className='section flex gap-2'>
            <button onClick={deleteSelectedTasks} className='w-[15px] h-[15px]'>
              <img
                src={deleteIcon}
                alt='delete'
                className='w-[15px] h-[15px]'
              />
            </button>
            <input
              type='checkbox'
              id='check_1'
              className='w-[15px] h-[15px]'
              onClick={(e) =>
                e.currentTarget.checked
                  ? setSelectedTodos([...todos])
                  : setSelectedTodos([])
              }
            />
          </div>
        </div>
      </div>
      {/* Todo Body */}
      <TodoList
        todos={todos}
        editTask={editTask}
        deleteTask={deleteTask}
        markComplete={markComplete}
        selectedTodos={selectedTodos}
        selectMultiple={selectMultiple}
      />
    </div>
  );
};

export default Todos;
