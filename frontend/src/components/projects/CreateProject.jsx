import { useState } from "react";
import { createProject } from "../../api/projectAPI";

function CreateProject({ closeForm }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    admin: JSON.parse(sessionStorage.getItem("user"))._id,
  });

  // const [usersData, setUsersData] = useState([]);

  // useEffect(() => {
  //   const fetchUsersData = async () => {
  //     try {
  //       const res = await getUsers();
  //       console.log(res.data);
  //       setUsersData(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     // const token = sessionStorage.getItem("token");
  //     // const res = await axios.get("/api/user", {
  //     //   headers: { Authorization: `Bearer ${token}` },
  //     // });
  //   };

  //   fetchUsersData();
  // }, []);

  function handleInputChange(event) {
    const { name, value, multiple, selectedOptions } = event.target;
    if (multiple) {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleCreateProjectSubmit(event) {
    try {
      event.preventDefault();
      const res = await createProject(formData);
      console.log(res.data);
      setFormData({
        name: "",
        description: "",
        members: [],
        admin: JSON.parse(sessionStorage.getItem("user"))._id,
      });
      closeForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl text-primary mb-6 font-semibold">
        Create New Project
      </h3>
      <form
        onSubmit={handleCreateProjectSubmit}
        className="flex flex-col text-sm gap-5"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-text-primary font-medium mb-1">
            Project Name
          </label>
          <input
            className="border border-border rounded-lg px-3 py-2 fous:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            required
            placeholder="Enter Your Task"
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
            className="border border-border rounded-lg px-3 py-2 fous:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            rows={3}
            placeholder="Describe the project"
            name="description"
            id="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* <div className="flex flex-col">
          <label
            htmlFor="members"
            className="text-text-primary font-medium mb-1"
          >
            Members
          </label>

          <select
            className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-28"
            id="members"
            name="members"
            value={formData.assignedTo}
            onChange={handleInputChange}
            multiple
          >
            {usersData.length > 0 ? (
              usersData.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            ) : (
              <option disabled>Loading users...</option>
            )}
          </select>
          <p className="text-xs text-text-secondary mt-1">
            Hold <kbd className="px-1 bg-gray-100 rounded">Ctrl</kbd> or{" "}
            <kbd className="px-1 bg-gray-100 rounded">Cmd</kbd> to select
            multiple.
          </p> */}
        {/* </div> */}

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition font-medium"
            onClick={() => closeForm()}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-accent transition">
            Create Project
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

export default CreateProject;
