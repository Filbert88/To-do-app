import React from "react";
import { type Task } from '@prisma/client';

interface CardProps {
  task: Task;
  onComplete: () => void;
  onUncomplete: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ task, onComplete, onUncomplete, onDelete }) => {
  return (
    <div className="w-full">
      <div className="mb-2 rounded border bg-white p-4">
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p className="line-clamp-2">{task.description}</p>
        <p className="text-sm text-gray-500">Due: {task.duedate ?  new Date(task.duedate).toLocaleDateString() : 'No Due Date'}</p>
        <div className="mt-2 flex gap-4">
          {task.isDone ? (
            <button className="rounded bg-blue-500 p-2 text-white" onClick={onUncomplete}>
              Mark as Undone
            </button>
          ) : (
            <button className="rounded bg-blue-500 p-2 text-white" onClick={onComplete}>
              Mark as Done
            </button>
          )}
          <button className="rounded bg-red-500 p-2 text-white" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
