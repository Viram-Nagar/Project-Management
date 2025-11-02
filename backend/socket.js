let io;

module.exports.init = (serverIo) => {
  io = serverIo;

  io.on("connection", (socket) => {
    console.log(
      `User with socket id :${socket.id} , has been connected to server`
    );

    socket.on("join:user", (userId) => {
      socket.join(userId);
    });
    socket.on("leave:user", (userId) => {
      socket.leave(userId);
    });

    socket.on("join:project", (projectId) => {
      socket.join(projectId);
    });
    socket.on("leave:project", (projectId) => {
      socket.leave(projectId);
    });
    socket.on("join:task", (taskId) => {
      socket.join(taskId);
    });
    socket.on("leave:task", (taskId) => {
      socket.leave(taskId);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports.getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};
