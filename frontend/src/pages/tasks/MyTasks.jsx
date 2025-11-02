import React, { useState, useEffect } from "react";
import TaskFilters from "../../components/tasks/TaskFilter";
import TaskList from "../../components/tasks/TaskList";
import { useSocket } from "../../context/SocketContext";
import { getMytask } from "../../api/taskAPI";
import ColumnStatus from "../../components/tasks/ColumnStatus";

const MyTasks = () => {
  const { socket, isConnected } = useSocket();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getMytask();
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();

    if (!socket || !isConnected) return;

    socket.on("task:assigned", (assignedTask) => {
      setTasks((prev) => [...prev, assignedTask]);
    });

    socket.on("tasks:updated", (updatedTask) =>
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      )
    );

    socket.on("task:remove", (removedTask) => {
      setTasks((prev) => prev.filter((task) => task._id !== removedTask._id));
    });

    return () => {
      socket.off("task:assigned");
      socket.off("tasks:user");
      socket.off("task:remove");
    };
  }, [socket, isConnected]);

  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const projectId = tasks[0]?.project._id;

  return (
    <>
      <div className="bg-surface border border-border rounded-xl shadow-sm p-6 sm:p-8 transition-all">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
            My Tasks
          </h2>
        </div>

        {/* Kanban Columns */}
        <section className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border/50 scroll-smooth snap-x">
          {/* Column - Todo */}
          <ColumnStatus title="Todo" tasks={todoTasks} projectId={projectId} />
          {/* ColumnStatus - In Progress */}
          <ColumnStatus
            title="In Progress"
            tasks={inProgressTasks}
            projectId={projectId}
          />
          {/* ColumnStatus - Done */}
          <ColumnStatus title="Done" tasks={doneTasks} projectId={projectId} />
        </section>
      </div>
    </>
  );
};

export default MyTasks;
