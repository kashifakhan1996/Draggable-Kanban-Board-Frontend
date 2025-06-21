import { useMemo, useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import type { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { addNewColumn, updateColumn } from "../utils/common";

const KanbanBoard = () => {
  const [columns, setColumn] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  /*const addNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumn((prev) => [...prev, columnToAdd]);
    console.log(columns);
  };
  const addNewTask = (columnId:Id) => {
    const taskToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumn((prev) => [...prev, columnToAdd]);
    console.log(columns);
  };
  const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return randomId;
  };
  
  const updateColumn = (data: Column) => {
    const { id, title } = data;
    const newColumn = columns.map((col) => {
      if (col.id === id) {
        return { ...col, title: title };
      }
      return col;
    });
    setColumn(newColumn);
  };*/
  const deleteColumn = (id: Id) => {
    setColumn(columns.filter((col) => col.id !== id));
  };
  const ondragstart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  };
  const ondragend = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) {
      return;
    }
    const overColumnId = over.id;
    const activeColumnId = active.id;
    if (overColumnId === activeColumnId) {
      return;
    }

    setColumn((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    "
    >
      <DndContext
        onDragStart={ondragstart}
        onDragEnd={ondragend}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col, idx) => (
                <ColumnContainer
                  column={col}
                  key={idx}
                  deleteColumn={() => deleteColumn(col.id)}
                  updateColumn={(data: Column) => {
                    const columnToUpdate = updateColumn(data, columns);
                    setColumn(columnToUpdate);
                  }}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  setTasks={setTasks}
                  allColumnTasks={tasks}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              const columnToAdd = addNewColumn(columns.length);
              setColumn((prev) => [...prev, columnToAdd]);
            }}
            className="
            h-[60px]
            w-[350px]
            min-w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-columnBackgroundColor
            ring-rose-500
            hover:ring-2
            flex
            gap-2
            p-4
            "
          >
            <PlusIcon /> Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={() => deleteColumn(activeColumn.id)}
                updateColumn={function (data: Column): void {
                  console.log(data);
                  throw new Error("Function not implemented.");
                }}
                tasks={[]}
                setTasks={setTasks}
                allColumnTasks={[]}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
