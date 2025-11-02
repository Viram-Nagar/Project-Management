import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById } from "../../api/projectAPI";
import { updateTask } from "../../api/taskAPI";

function TaskEditForm({ task, closeFrom }) {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate?.split("T")[0],
    status: task.status,
    createdAt: task.createdAt.split("T")[0],
    assignedTo: task.assignedTo._id,
  });
  const statuses = ["Todo", "In Progress", "Done"];

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await getProjectById(projectId);
        const user = res.data.members.filter(
          (member) => !task.assignedTo.some((user) => user._id === member._id)
        );
        setUsersData(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersData();
  }, [projectId, task.assignedTo]);

  function handleInputChange(event) {
    const { name, value, multiple, selectedOptions } = event.target;

    if (multiple) {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData((prev) => {
        const newData = { ...prev, [name]: values };
        return newData;
      });
    } else {
      setFormData((prev) => {
        const newData = { ...prev, [name]: value };
        return newData;
      });
    }
  }

  async function handleRemoveMember(userId) {
    try {
      const res = await updateTask(task._id, { removeMemberId: userId });

      closeFrom();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateTaskSubmit(event) {
    event.preventDefault();
    try {
      const res = await updateTask(task._id, formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    toast.success("Task updated successfully!");

    closeFrom();

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: "",
      createdAt: "",
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-primary mb-6">Edit Task</h3>

      <form
        onSubmit={handleUpdateTaskSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-text-primary font-medium mb-1"
            >
              Task Title
            </label>
            <input
              required
              className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder={task.title}
              name="title"
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-text-primary font-medium mb-1"
            >
              Description
            </label>
            <textarea
              className="border border-border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder={task.description}
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="dueDate"
              className="text-text-primary font-medium mb-1"
            >
              DeadLine
            </label>
            <input
              className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-text-primary font-medium mb-1"
            >
              Status
            </label>
            <select
              className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-text-primary font-medium mb-1"
            >
              Created Date
            </label>
            <input
              className="border border-border rounded-lg px-3 py-2 bg-gray-50 text-text-secondary cursor-not-allowed"
              id="status"
              name="status"
              type="date"
              value={formData.createdAt}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="assignedTo"
              className="text-text-primary font-medium mb-1"
            >
              Assign Members
            </label>
            <select
              className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-28"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              multiple
            >
              {usersData.length > 0 ? (
                usersData.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option disabled>No additional members available</option>
              )}
            </select>

            <div className="mt-3">
              <h4 className="font-semibold text-text-primary mb-2">
                Currently Assigned:
              </h4>
              <div className="divide-y divide-border border border-border rounded-lg bg-surface">
                {task.assignedTo?.length > 0 ? (
                  task.assignedTo.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <span className="text-text-primary">{member.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member._id)}
                        className="text-error hover:text-error/80 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-text-secondary px-3 py-2">
                    No members assigned.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={closeFrom}
            className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-accent transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEditForm;
