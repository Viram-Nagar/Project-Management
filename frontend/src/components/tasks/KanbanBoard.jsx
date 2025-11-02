import ColumnStatus from "./ColumnStatus";
import { DndContext } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import TaskForm from "./TaskForm";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { Plus } from "lucide-react";
import Modal from "../ui/Modal";

function Tasks({ tasks: initialTasks, className }) {
  const { socket, isConnected } = useSocket();
  const [tasks, setTasks] = useState(initialTasks);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const navigate = useNavigate();
  const { projectId } = useParams();
  // console.log(initialTasks);
  // console.log(tasks);
  useEffect(() => {
    setTasks(initialTasks);

    if (socket && isConnected && projectId) {
      socket.emit("join:project", projectId);
      console.log(`Joined project room : ${projectId}`);
    }

    return () => {
      socket?.emit("leave:project", projectId);
      console.log(`Leaved project room : ${projectId}`);
    };
  }, [socket, isConnected, projectId, initialTasks]);

  useEffect(() => {
    if (!socket) return;
    socket.on("task:added", (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    socket.on("task:updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on("task:deleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("task:added");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [setTasks, socket]);

  const todoTasks = tasks?.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = tasks?.filter((task) => task.status === "Done");

  function handleShowAddTask() {
    setIsModalOpen(true);
  }

  return (
    <div
      className={` bg-surface border border-border rounded-xl shadow-sm p-6 sm:p-8 transition-all  ${className}`}
    >
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm closeForm={() => setIsModalOpen(false)} setTasks={tasks} />
      </Modal>

      <div className="flex flex-col sm:flex-row justify-between tiems-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
          All Tasks
        </h2>
        {user?.role === "admin" && (
          <button
            className="flex items-center gap-2 mt-3 sm:mt-0 px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-accent transition-colors duration-200 text-sm font-medium shadow-sm"
            onClick={handleShowAddTask}
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        )}
      </div>
      {/* <TaskList tasks={tasks} refreshTask={getTasks} /> */}
      <section className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border/50 scroll-smooth snap-x">
        <ColumnStatus title="Todo" tasks={todoTasks} projectId={projectId} />
        <ColumnStatus
          title="In Progress"
          tasks={inProgressTasks}
          projectId={projectId}
        />
        <ColumnStatus title="Done" tasks={doneTasks} projectId={projectId} />
      </section>
    </div>
  );
}

export default Tasks;
