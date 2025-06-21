import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import type { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { addNewTask } from "../utils/common";
import TaskCard from "./TaskCard";
import TaskTextarea from "./TaskTextarea";

interface Props {
  column: Column;
  tasks: Task[];
  allColumnTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  deleteColumn: () => void;
  updateColumn: (data: Column) => void;
}
const ColumnContainer = (props: Props) => {
  const {
    column,
    tasks,
    allColumnTasks,
    setTasks,
    deleteColumn,
    updateColumn,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });
  const updateTitle = (data: Column) => {
    updateColumn(data);
  };

  const deleteTask = (taskId: Id) =>
    setTasks(tasks.filter((task) => task.id !== taskId));

  const addTask = () => {
    console.log(tasks);
    const taskToAdd: Task = addNewTask(column.id, currentTask);
    setTasks([...allColumnTasks, taskToAdd]);
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        style={style}
        ref={setNodeRef}
        className="
        flex
        flex-col
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        min-h-[500px]
        opacity-40
        border-2
        border-rose-500
            "
      ></div>
    );
  } else {
    return (
      <div
        style={style}
        ref={setNodeRef}
        className="
        flex
        flex-col
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        min-h-[500px]
        "
      >
        <div
          {...attributes}
          {...listeners}
          onClick={() => setEditMode(true)}
          className="
                    bg-mainBackgroundColor
                    text-md
                    h-[60px]
                    cursor-grab
                    rounded-md
                    p-3
                    font-bold
                    border-columnBackgroundColor
                    border-4
                    flex
                    items-center
                    justify-between
                "
        >
          <div className="flex gap-2">
            <div
              className="
                            flex
                            justify-center
                            items-center
                            bg-columnBackgroundColor
                            px-2
                            py-1
                            text-sm
                            rounded-full
                            
                        "
            >
              {tasks?.length || 0}
            </div>
            {!editMode && column.title}
            {editMode && (
              <input
                className="
                bg-black
                border-2
                focus:border-rose-500 
                border-rounded
                outline-none
                px-2
                py-2
                "
                value={column.title}
                onChange={(e) =>
                  updateTitle({ id: column.id, title: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
                autoFocus
                onBlur={() => setEditMode(false)}
              />
            )}
          </div>
          <button onClick={deleteColumn}>
            <TrashIcon
              extClass={`
                        rounded
                        stroke-gray-500
                        hover:stroke-white
                        hover:bg-columnBackgroundColor`}
            />
          </button>
        </div>

        <div className="flex flex-grow flex-col mt-2 overflow-auto">
          {tasks &&
            tasks.map((task) => (
              <TaskCard deleteTask={deleteTask} task={task} />
            ))}
          {addTaskMode && (
            <TaskTextarea
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              setAddTaskMode={setAddTaskMode}
              addTask={addTask}
            />
          )}
        </div>
        <div>
          <button
            className="
              flex
              gap-2
              items-center
              border-columnBackgroundColor border-2 border-x-columnBackgroundColor
              rounded-md
              bg-mainBackgroundColor
              hover:text-rose-500
              w-full
              h-[50px]
           "
            onClick={() => setAddTaskMode(true)}
          >
            <PlusIcon />
            Add Task
          </button>
        </div>
      </div>
    );
  }
};

export default ColumnContainer;
