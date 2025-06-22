import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import type { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: () => void;
  updateTaskContent: (taskId: Id, content: string) => void;
}

const TaskCard = (props: Props) => {
  const { task, deleteTask, updateTaskContent } = props;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(task?.content);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setIsMouseOver(false);
  };

  if (editMode)
    return (
      <div
        key={task.id}
        className="
        flex
        items-center
        text-left
        m-2
        p-2.5
        gap-2 
        bg-mainBackgroundColor
        rounded-xl
        hover:ring-rose-500
        hover:ring-2
        hover:ring-inset
        cursor-grab
        h-[100px]
        min-h-[100px]
        relative
        task
        "
      >
        <textarea
          className="
            bg-transparent          
            resize-none 
            h-[90%]
            h-min-[90px]
            w-full
            border-none
            focus:outline-none
            "
          value={taskContent || ""}
          onChange={(e) => setTaskContent(e.target.value)}
          autoFocus
          onBlur={() => toggleEditMode}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            if (e.key === "Enter" && task?.content.trim() !== "") {
              e.preventDefault(); // prevent newline
              updateTaskContent(task.id, taskContent);
            }
            toggleEditMode();
          }}
        />
      </div>
    );

  return (
    <div
      key={task.id}
      className="
        flex
        items-center
        text-left
        m-2
        gap-2           
        p-2.5
        bg-mainBackgroundColor
        rounded-xl
        hover:ring-rose-500
        hover:ring-2
        hover:ring-inset
        cursor-grab
        h-[100px]
        min-h-[100px]
        relative
        task
        "
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        onClick={toggleEditMode}
        className="
                my-auto
                h-[90%]
                w-full
                overflow-y-auto
                overflow-x-auto
                whitespace-pre-wrap
                text-white
                  "
        dangerouslySetInnerHTML={{ __html: task.content }}
      ></div>
      {isMouseOver && (
        <button onClick={() => deleteTask()}>
          <TrashIcon
            extClass={`
                    rounded
                    stroke-gray-500
                    ahover:stroke-white
                    hover:bg-columnBackgroundColor`}
          />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
