// layouts/MainLayout.jsx
import Header from "./Header";
import useJoinUserRoom from "../hooks";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";

export default function MainLayout() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  useJoinUserRoom(user._id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 h-screen  overflow-hidden">
      <Header className="col-span-full h-16 bg-white shadow-md fixed top-0 left-0 right-0 z-50" />
      <div className="col-span-full grid md:grid-cols-8 lg:grid-cols-12 pt-16 h-full">
        <Sidebar className="hidden md:block md:col-span-2 lg:col-span-3 bg-surface h-full overflow-y-auto sticky top-16 border-r border-border px-4 py-6" />
        <main className="col-span-full md:col-span-6 lg:col-span-9 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
        <MobileNav className="fixed bottom-0 right-0 left-0 bg-white border-t border-border py-2 z-50 md:hidden flex justify-around items-center shadow-md h-16" />
      </div>
    </div>
  );
}
