import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "../../components/Section";
import ProjectHead from "../../components/projects/ProjectHead";
import Tasks from "../../components/tasks/KanbanBoard";
import UpdateProject from "../../components/projects/UpdateProject";
import { useSocket } from "../../context/SocketContext";
import { getProjectById } from "../../api/projectAPI";
import Modal from "../../components/ui/Modal";

function ProjectInfo() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const res = await getProjectById(projectId);
        setProjectInfo(res.data);
      } catch (error) {
        console.log("Error in Project Info", error);
      }
    };

    fetchProjectInfo();
  }, [projectId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("project:updated", (updateProject) => {
      console.log(updateProject);
      setProjectInfo(updateProject);
    });

    return () => {
      socket.off("project:updated");
    };
  }, [socket]);

  function handleOpenUpdateProjectForm() {
    setIsModalOpen(true);
  }

  console.log(projectInfo);

  return (
    <>
      <Section className="space-y-6">
        <ProjectHead
          title={projectInfo.name}
          admin={projectInfo.admin?.name}
          members={projectInfo.members}
          tasks={projectInfo.tasks}
          description={projectInfo.description}
          onOpenForm={handleOpenUpdateProjectForm}
        />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UpdateProject
          projectInfo={projectInfo}
          closeForm={() => setIsModalOpen(false)}
        />
      </Modal>

      <Tasks className="mt-8" tasks={projectInfo.tasks} />
    </>
  );
}

export default ProjectInfo;
