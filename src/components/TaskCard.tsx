import TrashIcon from "../icons/TrashIcon";
import type { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (taskId: Id) => void;
}

const TaskCard = (props: Props) => {
  const { task, deleteTask } = props;
  return (
    <div
      key={task.id}
      className="
        flex
        gap-2               
        m-3
        bg-mainBackgroundColor
        rounded-md
        hover:ring-rose-500
        hover:ring-2
        hover:ring-inset
        cursor-grab
        "
      onClick={() => console.log()}
    >
      <div
        className="
                px-10
                py-10
                text-white
                  "
        dangerouslySetInnerHTML={{ __html: task.content }}
      ></div>
      <button onClick={() => deleteTask(task.id)}>
        <TrashIcon
          extClass={`
                    rounded
                    stroke-gray-500
                    ahover:stroke-white
                    hover:bg-columnBackgroundColor`}
        />
      </button>
    </div>
  );
};

export default TaskCard;
