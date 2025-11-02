import { useState } from "react";
import { useParams } from "react-router-dom";
import { inviteRequest } from "../../api/inviteAPI";
import { Pencil, UserPlus, Users } from "lucide-react";

function ProjectHead({
  title,
  members,
  admin,
  tasks,
  description,
  onOpenForm,
}) {
  const { projectId } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isInvite, setIsInvite] = useState(false);
  const [inviteData, setInviteData] = useState({
    projectId: projectId,
    email: "",
  });
  const taskCount = tasks?.length;

  const taskAccomplished = tasks?.reduce(
    (taskDone, task) => (task.status === "Done" ? taskDone + 1 : taskDone),
    0
  );

  function handleChangeInput(event) {
    setInviteData((prev) => ({ ...prev, email: event.target.value }));
  }

  async function handleInvite() {
    console.log(inviteData);

    try {
      const res = await inviteRequest(inviteData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    setIsInvite(false);
    setInviteData({ projectId, email: "" });
  }

  return (
    <header className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mt-1">
            {description}
          </p>
        </div>
        {user.role === "admin" && (
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-accent transition-colors text-sm font-meduim shadow-sm duration-200"
              onClick={onOpenForm}
            >
              <Pencil className="w-4 h-4" />
              Edit Project
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium duration-200"
              onClick={() => setIsInvite(true)}
            >
              <UserPlus className="h-4 w-4" />
              Invite
            </button>
          </div>
        )}
      </div>

      {isInvite && (
        <div className="mt-4 bg-white border border-border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary " />
            Invite Member
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter user email"
              value={inviteData.email}
              onChange={handleChangeInput}
              className="border border-border rounded:lg p-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={handleInvite}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-accent text-sm font-meduim shadow-sm transition-colors"
            >
              Send Invite
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium duration-200"
              onClick={() => setIsInvite(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-sm text-text-primary">
        <p>
          <span className="font-medium text-text-primary">Admin:</span>
          &nbsp;{admin}
        </p>
        <p>
          {" "}
          <span className="font-medium text-text-primary">Total Tasks:</span>
          &nbsp;{taskCount}
        </p>
        <p>
          {" "}
          <span className="font-medium text-text-primary">
            Completed Tasks:
          </span>
          &nbsp;{taskAccomplished}
        </p>
      </div>
      <div className="mt-4 text-sm text-text-secondary">
        <p className="font-medium text-text-primary mb-1">Members :</p>
        <div className="flex flex-wrap gap-2">
          {members?.map((member) => (
            <span
              key={member._id}
              className="px-2 py-2 bg-primary/10 text-primary text-xs rounded-full"
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default ProjectHead;
