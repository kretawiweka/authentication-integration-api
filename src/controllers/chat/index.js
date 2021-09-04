const config = require("../../config.js");
const socketIo = require("socket.io");
const { addUser, removeUser, getUsersInRoom } = require("./user");
const { addMessage, getMessagesInRoom } = require("./message");

module.exports = function (router, server, cors) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
  const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
  const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
  const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
  const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // Join a conversation
    const { roomId, name, picture } = socket.handshake.query;
    socket.join(roomId);

    const user = addUser(socket.id, roomId, name, picture);
    io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      const message = addMessage(roomId, data);
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
    });

    // Listen typing events
    socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
    });
    socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
      socket.leave(roomId);
    });
  });

  router.get("/rooms/:roomId/users", (req, res) => {
    const users = getUsersInRoom(req.params.roomId);
    return res.json({ users });
  });

  router.get("/rooms/:roomId/messages", (req, res) => {
    const messages = getMessagesInRoom(req.params.roomId);
    return res.json({ messages });
  });

  return router;
};
