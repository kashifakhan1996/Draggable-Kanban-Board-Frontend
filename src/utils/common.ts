import type { Column, Id, Task } from "../types";

export const addNewColumn = (cLength:number) => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${cLength + 1}`,
    };
    return columnToAdd
    //setColumn((prev) => [...prev, columnToAdd]);
  };

export const addNewTask = (columnId:Id,content:string) => {
    const taskToAdd: Task = {
      id: generateId(),
      columnId: columnId,
      content: content,
    };
    return taskToAdd
  };

const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return randomId;
};

export const updateColumn = (data: Column,columns:Column[]) => {
    const { id, title } = data;
    const newColumn = columns.map((col) => {
        if (col.id === id) {
        return { ...col, title: title };
        }
        return col;
    });
    return newColumn
    //setColumn(newColumn);
};