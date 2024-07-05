import React from "react";
import { type Task } from '@prisma/client';
import { BsFillTrashFill } from 'react-icons/bs'; // Importing the icon from react-icons

interface CardProps {
  task: Task;
  onComplete: () => void;
  onUncomplete: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ task, onComplete, onUncomplete, onDelete }) => {
  const isOverdue = !task.isDone && task.duedate && new Date(task.duedate) < new Date();

  return (
    <div className="w-full">
      <div className={`mb-2 rounded p-4 ${isOverdue ? 'border-2 border-red-500' : 'bg-[#3A3C48]'}`}>
        <h2 className="text-2xl font-bold text-white capitalize">{task.title}</h2>
        <p className="line-clamp-2 text-white">{task.description}</p>
        <p className="text-sm text-gray-300">Due: {task.duedate ? new Date(task.duedate).toLocaleDateString() : 'No Due Date'}</p>
        {isOverdue && <p className="text-red-500">Past Due Already</p>}
        <div className="mt-3 flex gap-4">
          {task.isDone ? (
            <button className="rounded bg-custom-red p-2 text-white" onClick={onUncomplete}>
              Mark as Undone
            </button>
          ) : (
            <button className="rounded bg-[#09D9B3D9] p-2 text-white" onClick={onComplete}>
              Mark as Done
            </button>
          )}
          <button className="rounded bg-[#DC2626] p-2 text-black flex items-center" onClick={onDelete}>
            <BsFillTrashFill className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
