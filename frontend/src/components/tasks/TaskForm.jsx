import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../api/projectAPI";
import { createTask } from "../../api/taskAPI";

function TaskForm({ closeForm }) {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: [],
    projectId,
    createdBy: JSON.parse(sessionStorage.getItem("user"))._id,
  });

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await getProjectById(projectId);
        console.log(res.data.members);
        setUsersData(res.data.members);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersData();
  }, [projectId]);

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

  async function handleAddTaskSubmit(event) {
    event.preventDefault();
    try {
      await createTask(formData);
    } catch (error) {
      console.log(error);
    }

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      assignedTo: [],
      projectId,
    });

    closeForm();
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-primary mb-6">Add New Task</h3>
      <form
        onSubmit={handleAddTaskSubmit}
        className="flex flex-col gap-5 text-sm"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-text-primary font-medium mb-1">
            Task Title
          </label>
          <input
            className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            placeholder="Enter task title"
            name="title"
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            required
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
            placeholder="Describe Your Task"
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
            required
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="assignedTo"
            className="text-text-primary font-medium mb-1"
          >
            Assign To
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
              <option disabled>No team members found</option>
            )}
          </select>{" "}
          <p className="text-xs text-text-secondary mt-1">
            Hold <kbd className="px-1 bg-gray-100 rounded">Ctrl</kbd> or{" "}
            <kbd className="px-1 bg-gray-100 rounded">Cmd</kbd> to select
            multiple.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeForm}
            className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-accent transition"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
