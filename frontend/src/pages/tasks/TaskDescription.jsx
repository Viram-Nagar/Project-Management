import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TaskEditForm from "../../components/tasks/TaskEditForm";
import { useSocket } from "../../context/SocketContext";
import TaskStatusDropdown from "../../components/tasks/TaskStatusDropdown";
import { deleteTask, getTaskById, updateTask } from "../../api/taskAPI";
import { getComments, postComment } from "../../api/commentAPI";
import Button from "../../components/ui/Button";
import { Edit3, Trash2 } from "lucide-react";
import Modal from "../../components/ui/Modal";

function TaskDescription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState({
    text: "",
    taskId: "",
    createdBy: "",
  });
  const { taskId, projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (data) {
      setTaskData(data);
    }

    const fetchTaskData = async () => {
      try {
        const res = await getTaskById(taskId);
        setTaskData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTaskComments = async () => {
      // const token = sessionStorage.getItem("token");
      // const res = await axios?.get(
      //   `http://localhost:3000/api/comments/${taskId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      try {
        const res = await getComments(taskId);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }

      // console.log(res.data);
    };

    fetchTaskData();
    fetchTaskComments();
  }, [data, projectId, taskId]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit("join:task", taskId);

    function handleTaskUpdate(updatedTask) {
      if (updatedTask._id === taskId) {
        setTaskData(updatedTask);
      }
    }

    function handleAllComments(newComment) {
      setComments((prevComments) => {
        const exist = prevComments.some(
          (comment) => comment._id === newComment._id
        );
        if (exist) return prevComments;
        return [...prevComments, newComment];
      });
    }

    socket.on("task:updated", handleTaskUpdate);
    socket.on("comment:added", handleAllComments);

    return () => {
      socket.emit("leave:task", taskId);
      socket.off("task:updated");
    };
  }, [isConnected, socket, taskId]);

  async function hanndleDeleteTask(id) {
    try {
      if (user.role === "admin") {
        await deleteTask(id);

        navigate(`/projects/${projectId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddComment(event) {
    event.preventDefault();
    setAddComment((prev) => ({
      ...prev,
      taskId: taskId,
      createdBy: user._id,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmitComment(event) {
    event.preventDefault();

    try {
      await postComment(taskId, addComment);
    } catch (error) {
      console.log(error);
    }
    // const token = sessionStorage.getItem("token");
    // await axios?.post(
    //   `http://localhost:3000/api/comments/${taskId}`,
    //   addComment,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    setAddComment({
      text: "",
      taskId: "",
    });
    // console.log(res.data);
  }

  return (
    <div className="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border shadow-sm text-text-primary">
      {taskData.message && <p>{taskData.message}</p>}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskEditForm task={taskData} closeFrom={() => setIsModalOpen(false)} />
      </Modal>

      <header className="flex justify-between items-center border-b border-border pb-3">
        <h2 className="text-2xl font-semibold text-primary">Task Details</h2>
        <div className="flex gap-3">
          {user?.role == "admin" && (
            <>
              <button
                onClick={hanndleDeleteTask}
                className="p-2 bg-error/10 hover:bg-error/20 text-error rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsModalOpen((p) => !p)}
                className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-sm hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            All Tasks
          </button>
        </div>
      </header>
      <section className="flex flex-col gap-3">
        <div>
          <h3 className="font-medium text-text-secondary">Title</h3>
          <p className="text-lg">{taskData.title}</p>
        </div>
        <div>
          <h3 className="font-medium text-text-secondary">Description</h3>
          <p className="text-base leading-relaxed">{taskData.description}</p>
        </div>

        <div className="grid gris-cols-1  gap-3 mt-2">
          <div className="flex gap-2 items-center">
            <span className="font-medium text-text-secondary">Status:</span>
            {taskData.assignedTo?.find((m) => m._id === user._id) ? (
              <TaskStatusDropdown
                taskId={taskId}
                task={taskData}
                updateTaskStatus={(id, s) => updateTask(id, { status: s })}
              />
            ) : (
              <span className="text-primary font-medium">
                {taskData.status}
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            <span className="font-medium">Deadline:</span>{" "}
            {new Date(taskData.dueDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-sm text-text-secondary">
            <span className="font-medium">Created:</span>{" "}
            {new Date(taskData.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="mt-2">
          <p className="font-medium text-text-secondary mb-1">Assigned To:</p>
          <div className="flex flex-wrap gap-2">
            {taskData.assignedTo?.map((m) => (
              <span
                key={m._id}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {m.name}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-4 border-t border-border p-4">
        <h3 className="text-xl font-semibold text-primary mb-3">Comments</h3>
        <form
          className="flex flex-com gap-3 mb-5"
          onSubmit={handleSubmitComment}
        >
          <textarea
            placeholder="Add your comment..."
            name="text"
            type="text"
            className="border border-border rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none bg-white"
            value={addComment.text}
            onChange={handleAddComment}
          ></textarea>
          <button className="self-end px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ">
            Add Comment
          </button>
        </form>
        <ul className="flex flex-col gap-3 ">
          {comments
            ?.slice()
            .reverse()
            .map((comment) => (
              <li
                key={comment._id}
                className="bg-white border border-border rounded-lg p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm text-text-primary">{comment.text}</p>
                  <p className="text-xs text-text-primary mt-1">
                    - @{comment.user?.name}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default TaskDescription;
