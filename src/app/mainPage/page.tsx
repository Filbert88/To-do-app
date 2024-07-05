"use client";
import React, { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import Card from "../_components/Card";
import { type Task } from "@prisma/client";
import { api } from "~/trpc/react";

export default function MainPage() {
  const { toast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    duedate: "",
  });

  const { data: tasks, refetch } = api.task.getTasks.useQuery({
    limit: 100,
    offset: 0,
    search,
    filter,
  });

  console.log("tes",tasks);

  const addTaskMutation = api.task.addTask.useMutation({
    onSuccess: () => {
      toast({
        title: "Task added successfully",
      });
      setShowPopup(false);
      setNewTask({title: "",
        description: "",
        duedate: ""})
      void refetch(); // use void to ignore promise
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to add task",
      });
    },
  });

  const markTaskCompletedMutation = api.task.markTaskCompleted.useMutation({
      onSuccess: () => {
        toast({
          title: "Task marked as completed",
        });
        void refetch();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to mark task as completed",

        });
      },
    },
  );

  const markTaskUncompletedMutation = api.task.markTaskUncompleted.useMutation({
      onSuccess: () => {
        toast({
          title: "Task marked as not completed",
        });
        void refetch();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to mark task as not completed",

        });
      },
    },
  );

  const deleteTaskMutation = api.task.deleteTask.useMutation({
    onSuccess: () => {
      toast({
        title: "Task deleted successfully",
      });
      void refetch();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to delete task",
      });
    },
  });

  const handleAddTask = () => {
    addTaskMutation.mutate(newTask);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold">To-Do List</h1>
        <div className="mb-4 flex w-full flex-col">
          <div className="mb-4 flex h-full w-full flex-row items-center">
            <input
              type="text"
              placeholder="Search tasks..."
              className="mr-2 w-full rounded border p-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="h-full">
              <select
                className="h-full rounded border bg-white p-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value as "all" | "completed" | "incomplete")}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incompleted</option>
              </select>
            </div>
          </div>

          <button
            className="mb-2 w-full rounded bg-green-500 p-2 text-white"
            onClick={() => setShowPopup(true)}
          >
            Add Task
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 px-10">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Add New Task</h2>
              <input
                type="text"
                placeholder="Task Title"
                className="mb-2 w-full rounded border-2 border-gray-300 p-2"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <textarea
                placeholder="Task Description"
                className="w-full rounded border-2 border-gray-300 p-2"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <input
                type="date"
                className="mb-2 w-full rounded border-2 border-gray-300 p-2"
                value={newTask.duedate}
                onChange={(e) =>
                  setNewTask({ ...newTask, duedate: e.target.value })
                }
              />
              <div className="flex gap-3">
                <button
                  className="rounded bg-green-500 p-2 text-white"
                  onClick={handleAddTask}
                >
                  Submit
                </button>
                <button
                  className="rounded bg-red-500 p-2 text-white"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {tasks?.map((task:Task) => (
          <Card
            key={task.id}
            task={task}
            onComplete={() => markTaskCompletedMutation.mutate({ id: task.id })}
            onUncomplete={() =>
              markTaskUncompletedMutation.mutate({ id: task.id })
            }
            onDelete={() => deleteTaskMutation.mutate({ id: task.id })}
          />
        ))}
      </div>
    </div>
  );
}
