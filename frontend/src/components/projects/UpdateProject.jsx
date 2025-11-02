import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateProject } from "../../api/projectAPI";

function UpdateProject({ projectInfo, closeForm }) {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    name: projectInfo.name,
    description: projectInfo.description,
    members: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdateProjectSubmit(event) {
    try {
      event.preventDefault();
      const res = await updateProject(projectId, formData);
      setFormData({
        name: "",
        description: "",
        members: [],
      });
      console.log(res.data);
      closeForm();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveMember(userId) {
    try {
      const res = await updateProject(projectId, { removeMemberId: userId });
      console.log(res.data);
      closeForm();
    } catch (error) {
      console.error("Error removing member:", error);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-primary mb-6">
        Update Project
      </h3>
      <form
        onSubmit={handleUpdateProjectSubmit}
        className="flex flex-col gap-5 text-sm"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-text-primary font-medium mb-1">
            Project Name
          </label>
          <input
            required
            className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            placeholder="Enter project name"
            name="name"
            id="name"
            type="text"
            value={formData.name}
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
            placeholder="Describe the project"
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-text-primary font-medium mb-1">
            Project Members
          </label>
          <div className="divide-y divide-border border border-border rounded-lg bg-surface">
            {projectInfo.members?.length > 0 ? (
              projectInfo.members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition"
                >
                  <span className="text-text-primary">{member.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member._id)}
                    className="text-error hover:text-error/80 transition"
                    title="Remove member"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm px-3 py-2">
                No members added yet.
              </p>
            )}
          </div>
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
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProject;
