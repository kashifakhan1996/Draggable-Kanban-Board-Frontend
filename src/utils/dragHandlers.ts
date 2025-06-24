import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import type { Column, Task } from "../types";
import { arrayMove } from "@dnd-kit/sortable";


export const ondragstart = (
    event: DragStartEvent,
    setActiveColumn:(column: Column) => void,
    setActiveTask:(task: Task) => void
) => {
    //const {}
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };
export const ondragend = (
    event: DragEndEvent,
    setActiveColumn:(column: Column|null) => void,
    setActiveTask:(task: Task|null) => void,
    setColumn:(items: Column[]) => void) => {
    
    setActiveColumn(null)
    setActiveTask(null)
    const { over, active } = event;
    if (!over) {
      return;
    }
    const overColumnId = over.id;
    const activeColumnId = active.id;
    if (overColumnId === activeColumnId) {
      return;
    }

    setColumn((columns: Column[]) => {
      const activeColumnIndex = columns.findIndex(
        (col:Column) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col:Column) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
};

export const ondragover = (
    event:DragOverEvent,
    setTasks:(items: Column[]) => void
) =>{
    
    const {active,over} = event
    if(!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return

    const isActiveATask = active.data.current?.type==='Task'
    const isActiveAColumn = over.data.current?.type==='Task'

    if(isActiveATask && isActiveAColumn){
        setTasks((tasks)=>{
            const activeIndex = tasks.findIndex((task:Task)=>task.id===activeId)
            const overIndex = tasks.findIndex((task:Task)=>task.id===overId)
            if(tasks[activeIndex].columnId !== tasks[overIndex].columnId){
                tasks[activeIndex].columnId = tasks[overIndex].columnId
            }
            return arrayMove(tasks,activeIndex,overIndex)
        })
    }
}

