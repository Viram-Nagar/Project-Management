import { useEffect, useState } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { useNavigate } from "react-router-dom";
import CreateProject from "../../components/projects/CreateProject";
import { useSocket } from "../../context/SocketContext";
import { getProjects } from "../../api/projectAPI";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

function Project() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { socket } = useSocket();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.slice().reverse());
      } catch (error) {
        console.log("Error fectching Projects : ", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("project:created", (newProject) => {
      setProjects((prev) => [newProject, ...prev]);
    });

    socket.on("project:deleted", (id) =>
      setProjects((projects) =>
        projects.filter((project) => project._id !== id)
      )
    );

    socket.on("project:updated", (updatedProject) =>
      setProjects((projects) => {
        const newProjects = projects.filter(
          (project) => project._id !== updatedProject._id
        );

        return [...newProjects, updatedProject].slice().reverse();
      })
    );

    socket.on("project:removed", ({ projectId, message }) => {
      alert(message);
      setProjects((projects) =>
        projects.filter((project) => project._id !== projectId)
      );
      navigate("/projects");
    });

    return () => {
      socket.off("project:created");
      socket.off("project:deleted");
      socket.off("project:updated");
      socket.off("project:remove");
    };
  }, [socket, navigate]);

  function handleProjectInfo(id) {
    navigate(`/projects/${id}`);
  }

  function handleCreateProject() {
    setIsModalOpen(true);
  }

  return (
    <section className="space-y-6">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateProject closeForm={() => setIsModalOpen(false)} />)
      </Modal>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-text-primary">
          Welcome back, <span className="text-primary">{user.name}</span>
        </h2>

        {user.role === "admin" && (
          <button
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-accent transition-colors duration-200"
            onClick={handleCreateProject}
          >
            + New Project
          </button>
        )}
      </div>
      <div
        className={`grid gap-5 ${
          projects.length > 0
            ? "sm:grid-cols-2  xl:grid-cols-3"
            : "place-items-center py-16"
        }`}
      >
        {projects ? (
          projects?.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.name}
              admin={project.admin.name}
              members={project.members.length}
              onProjectInfo={handleProjectInfo}
              projectId={project._id}
              user={user}
              tasks={project.tasks.length}
            />
          ))
        ) : (
          <p className="text-text-secondary text-center">
            You are not part of any project yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default Project;
