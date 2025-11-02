import { useEffect, useState } from "react";
import { getInvites, inviteResponse } from "../../api/inviteAPI";
import { Mail, UserPlus, CheckCircle2, XCircle } from "lucide-react";

function InvitesPage() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all invites for current user
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await getInvites();
        // const token = sessionStorage.getItem("token");
        // const res = await axios.get("http://localhost:3000/api/invite/", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        setInvites(res.data);
      } catch (err) {
        console.error("Error fetching invites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  // ✅ Accept / Reject invite
  async function handleResponse(inviteId, status) {
    try {
      await inviteResponse(inviteId, { status });

      // const token = sessionStorage.getItem("token");
      // await axios.patch(
      //   `http://localhost:3000/api/invite/${inviteId}`,
      //   { status },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // Update UI instantly
      setInvites((prev) =>
        prev.map((invite) =>
          invite._id === inviteId ? { ...invite, status } : invite
        )
      );

      alert(`Invite ${status}`);
    } catch (err) {
      console.error("Error updating invite:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-text-secondary text-base">Loading invites...</p>
      </div>
    );
  }

  return (
    <>
      <section className="p-6 sm:p-8 bg-surface rounded-2xl border border-border shadow-sm">
        <header className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-primary" />
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Project Invites
          </h2>
        </header>

        {invites.length === 0 ? (
          <p className="text-text-secondary text-center py-12">
            You have no pending invites.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {invites
              // .slice()
              // .reverse()
              .map((invite) => (
                <li
                  key={invite._id}
                  className="bg-white border border-border rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="space-y-1">
                    <p className="text-base font-medium text-text-primary flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-primary" />
                      {invite.project?.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Invited by{" "}
                      <span className="font-medium text-text-primary">
                        {invite.sender?.name}
                      </span>
                    </p>
                    <p className="text-sm text-text-secondary">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          invite.status === "pending"
                            ? "text-warning"
                            : invite.status === "accepted"
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {invite.status}
                      </span>
                    </p>
                  </div>

                  {invite.status === "pending" && (
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button
                        onClick={() => handleResponse(invite._id, "accepted")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-success text-white text-sm rounded-lg hover:bg-success/90 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Accept
                      </button>
                      <button
                        onClick={() => handleResponse(invite._id, "rejected")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-error text-white text-sm rounded-lg hover:bg-error/90 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default InvitesPage;
