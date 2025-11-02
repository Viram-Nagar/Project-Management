import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import "./App.css";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
