import React from "react";
import edit from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";
import { Todo } from "../../types";

interface TodoListItemProps {
  task: Todo;
  selectedTodos:Array<Todo>
  editTask: (task: Todo) => void;
  deleteTask: (task: Todo) => void;
  markComplete: (task: Todo) => void;
  selectMultiple:(task:Todo)=>void
}

const TodoItem = ({ task, editTask,deleteTask,markComplete ,selectedTodos,selectMultiple}: TodoListItemProps) => {
  const getCreationDate = (task:Todo):string=>{
    let newDate = new Date(task.date).toLocaleDateString();
    return newDate;

  }
  return (
    <div
      className='w-auto bg-gray-100 flex justify-between mb-1 min-h-[40px] items-center px-3 rounded text-primary'
      key={task.date}
    >
      <div className='flex gap-2'>
        <input type={"checkbox"} defaultChecked={task.completed} onClick={()=>markComplete(task)}/>
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "",
            color: task.completed ? "grey" : "rgb(83, 168, 202)",
          }}
        >
          {task.text}
        </span>
      </div>
      <div className="flex gap-2 relative items-center">
        <div
        className={`w-[15px] h-[15px] hover:${ task.completed ?"curser-not-allowed" : "cursor-pointer"}`}
          onClick={() => editTask(task)}
          // style={{ pointerEvents: task.completed ? "none" : "all" }}
        >
          <img src={edit} className='todo_action' alt='edit' />
        </div>
        <div
        className="w-[15px] h-[15px] hover:cursor-pointer"
        onClick={() => deleteTask(task)}>
          <img src={deleteIcon} className='todo_action' alt='delete' />
        </div>

          <input
           className="w-[12px] h-[12px] hover:cursor-pointer"
            type={"checkbox"}
            defaultChecked={
              selectedTodos.filter((item) => item.date === task.date).length ? true : false 
            }
            onClick={() => selectMultiple(task)}
          />
        <div className="absolute bottom-[-13px] right-0 text-slate-400 text-[10px] text-right">
          {getCreationDate(task)}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
