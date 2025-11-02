const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
require("dotenv").config();
const { Server } = require("socket.io");

const initDB = require("./config/db");
const { init } = require("./socket");
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
const commentRouter = require("./routes/commentRoutes");
const inviteRouter = require("./routes/inviteRoutes");

// Initialize MongoDB
initDB();

// Initialize Express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//  Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

//  Create HTTP server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

init(io);

app.use("/api/tasks", taskRouter);
app.use("/api", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/projects", projectRouter);
app.use("/api/invites", inviteRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server is waiting for request" });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log("Server is listening to port 3000");
});
