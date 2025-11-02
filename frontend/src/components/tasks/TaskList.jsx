import TaskStatusDropdown from "./TaskStatusDropdown";
import TaskEditForm from "./TaskEditForm";
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { updateTask } from "../../api/taskAPI";
// import { useState } from "react";
// import { toast } from "react-toastify";

function TaskList({ tasks: allTasks }) {
  const { socket, isConnected } = useSocket();
  const [tasks, setTasks] = useState(allTasks);

  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  useEffect(() => {
    if (!socket || !isConnected) return;
    tasks?.map((task) => socket.emit("join:task", task._id));

    function handleTaskUpdate(updatedTask) {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    }

    socket.on("task:updated", handleTaskUpdate);

    return () => {
      tasks.map((task) => socket.emit("leave:task", task._id));
      socket.off("task:updated");
    };
  }, [socket, isConnected, tasks]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      // Optionally re-fetch tasks or update local state
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <>
      {/* {isOpenForm && (
        <TaskEditForm task={taskData} closeFrom={() => setIsOpenForm(false)} />
      )} */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {task.title}
            </h3>
            <p className="text-sm text-text-secondary mb-2">
              {task.project?.name}
            </p>
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {task.description}
            </p>{" "}
            <div className="flex items-center justify-between text-sm">
              <TaskStatusDropdown
                taskId={task._id}
                task={task}
                updateTaskStatus={updateTaskStatus}
              />
              <p className="text-text-secondary">
                {new Date(task.dueDate).toLocaleDateString("en-In", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            {/* <li>Title : {task.title}</li>
            <li>Prject : {task.project.name}</li>
            <li>Description : {task.description}</li>
            <li>
              Status :{" "}
              <TaskStatusDropdown
                taskId={task._id}
                task={task}
                updateTaskStatus={updateTaskStatus}
              />
            </li>
            <li>
              Deadline :
              {new Date(task.dueDate).toLocaleDateString("en-In", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </li> */}
            {/* <div className="flex gap-4">
              <button
                className="border-2 border-blue-800 hover:border-blue-600 p-1 rounded-lg bg-blue-800 hover:bg-blue-600   hover:outline-3 hover:outline-blue-400 hover:outline-offset-0"
                onClick={() => hanndleDeleteTask(task._id)}
              >
                Delete
              </button>
              <button
                className="border-2 border-blue-800 hover:border-blue-600 p-1 rounded-lg bg-blue-800 hover:bg-blue-600   hover:outline-3 hover:outline-blue-400 hover:outline-offset-0"
                onClick={() => handleOpenEditForm(task._id)}
              >
                Edit
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;
