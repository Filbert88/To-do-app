"use client";
import React, { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import Card from "../_components/Card";
import { type Task } from "@prisma/client";
import { api } from "~/trpc/react";
import Loading from "../_components/loading";

export default function MainPage() {
  const { toast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    duedate: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    duedate: "",
  });

  const {
    data: tasks,
    refetch,
    isLoading: isFetching,
  } = api.task.getTasks.useQuery({
    limit: 100,
    offset: 0,
    search,
    filter,
  });

  const sortedTasks = tasks?.slice().sort((a: Task, b: Task) => {
    if (!a.isDone && b.isDone) return -1;
    if (a.isDone && !b.isDone) return 1;
    const dateA = a.duedate ? new Date(a.duedate) : new Date(8640000000000000);
    const dateB = b.duedate ? new Date(b.duedate) : new Date(8640000000000000);
    return dateA.getTime() - dateB.getTime();
  });

  const validateForm = () => {
    const newErrors = {
      title: newTask.title ? "" : "Title is required",
      description: newTask.description ? "" : "Description is required",
      duedate: newTask.duedate ? "" : "Due date is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const addTaskMutation = api.task.addTask.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast({
        title: "Task added successfully",
      });
      setLoading(false);
      setNewTask({ title: "", description: "", duedate: "" });
      void refetch();
    },
    onError: () => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Failed to add task",
      });
    },
  });

  const markTaskCompletedMutation = api.task.markTaskCompleted.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast({
        title: "Task marked as completed",
      });
      void refetch();
    },
    onError: () => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Failed to mark task as completed",
      });
    },
  });

  const markTaskUncompletedMutation = api.task.markTaskUncompleted.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast({
        title: "Task marked as not completed",
      });
      void refetch();
    },
    onError: () => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Failed to mark task as not completed",
      });
    },
  });

  const deleteTaskMutation = api.task.deleteTask.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast({
        title: "Task deleted successfully",
      });
      void refetch();
    },
    onError: () => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Failed to delete task",
      });
    },
  });

  const handleAddTask = () => {
    if (validateForm()) {
      setShowPopup(false);
      addTaskMutation.mutate(newTask);
    }
  };

  const handleOpenPopup = () => {
    setErrors({ title: "", description: "", duedate: "" });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setErrors({ title: "", description: "", duedate: "" });
    setNewTask({ title: "", description: "", duedate: "" });
    setShowPopup(false);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="mb-4 text-center text-3xl font-bold text-white">
          To Do List
        </h1>
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
                onChange={(e) =>
                  setFilter(e.target.value as "all" | "completed" | "incomplete")
                }
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>

          <button
            className="mb-2 w-full rounded bg-custom-blue p-2 text-white"
            onClick={handleOpenPopup}
          >
            Add Task
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 px-10">
            <div className="rounded-lg bg-[#141414] p-6 shadow-lg w-full max-w-4xl">
              <h2 className="mb-4 text-xl font-bold text-white">
                Add New Task
              </h2>
              <input
                type="text"
                placeholder="Task Title"
                className="w-full rounded border-2 border-gray-300 p-2"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
              <textarea
                placeholder="Task Description"
                className="mt-2 w-full rounded border-2 border-gray-300 p-2"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
              <input
                type="date"
                className="mt-1 w-full rounded border-2 border-gray-300 p-2"
                value={newTask.duedate}
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                onChange={(e) =>
                  setNewTask({ ...newTask, duedate: e.target.value })
                }
              />
              {errors.duedate && <p className="text-red-500">{errors.duedate}</p>}
              <div className="mt-3 flex gap-3">
                <button
                  className="rounded bg-[#09D9B3D9] p-2 text-white"
                  onClick={handleAddTask}
                  disabled={loading}
                >
                  Submit
                </button>
                <button
                  className="rounded bg-custom-red p-2 text-white"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading || isFetching ? (
          <Loading />
        ) : (
          sortedTasks?.map((task: Task) => (
            <Card
              key={task.id}
              task={task}
              onComplete={() => markTaskCompletedMutation.mutate({ id: task.id })}
              onUncomplete={() =>
                markTaskUncompletedMutation.mutate({ id: task.id })
              }
              onDelete={() => deleteTaskMutation.mutate({ id: task.id })}
            />
          ))
        )}
      </div>
    </div>
  );
}
