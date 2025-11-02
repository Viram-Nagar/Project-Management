import InvitesPage from "../pages/invite/InvitePage";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import TaskDescription from "../pages/tasks/TaskDescription";
import Project from "../pages/projects/Project";
import ProjectInfo from "../pages/projects/ProjectInfo";
import MainLayout from "../components/layout/MainLayout";
import MyTasks from "../pages/tasks/MyTasks";
import LandingPage from "../pages/landing/LandingPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/:projectId" element={<ProjectInfo />} />
          <Route
            path="/projects/:projectId/tasks/:taskId"
            element={<TaskDescription />}
          />
          <Route path="/invites" element={<InvitesPage />} />
          <Route path="/my-tasks" element={<MyTasks />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
