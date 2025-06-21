interface Props {
  currentTask: string;
  setCurrentTask: (val: string) => void;
  setAddTaskMode: (val: boolean) => void;
  addTask: () => void;
}

const TaskTextarea = (props: Props) => {
  const { currentTask, setCurrentTask, setAddTaskMode, addTask } = props;
  return (
    <textarea
      className="
        border-2
        bg-mainBackgroundColor
        focus:border-rose-500
        border-rounded
        rounded-md
        outline-none
        min-h-[90px] 
        resize-y 
        w-[90%]
            px-2
        py-2
        m-3
        "
      value={currentTask}
      onChange={(e) => setCurrentTask(e.target.value)}
      autoFocus
      onBlur={() => setAddTaskMode(false)}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        if (e.key === "Enter" && currentTask.trim() !== "") {
          e.preventDefault(); // prevent newline
          setCurrentTask(""); // clear textarea
          addTask();
        }
        setAddTaskMode(false);
      }}
    />
  );
};

export default TaskTextarea;
