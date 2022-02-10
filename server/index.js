const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const { Nuxt, Builder } = require("nuxt");
// We instantiate Nuxt with the options
const config = require("../nuxt.config.js");
config.dev = !isProd;

const nuxt = new Nuxt(config);
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}
app.use(nuxt.render);

server.listen(port, () =>
  console.log(`server listening at http://localhost:${port}`)
);


const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  const user_object = socket.handshake.auth.user_object;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      socket.user_object = user_object;
      // console.log('session.user_object');
      // console.log(user_object);
      return next();
    }
  }
  // console.log('user_object');
  // console.log(user_object);
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = user_object.user_id;
  socket.username = username;
  socket.user_object = user_object;
  next();
});

io.on("connection", (socket) => {
  // persist session
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    user_object: socket.user_object,
    connected: true,
  });

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    user_object: socket.user_object,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // fetch existing users
  const users = [];
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  let Myusers = sessionStore.findMyFrindsIfOnlen(socket.user_object) || [];
  Myusers.forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      user_object: session.user_object,
      connected: session.connected,
      messages: messagesPerUser.get(session.userID) || [],
    });
  });
  // console.log('socket');
  // console.log(socket.user_object);
  // sessionStore.findAllSessions().forEach((session) => {
  //   users.push({
  //     userID: session.userID,
  //     username: session.username,
  //     user_object: socket.user_object,
  //     connected: session.connected,
  //     messages: messagesPerUser.get(session.userID) || [],
  //   });
  // });

  socket.on("chat page", () => {
    socket.emit("users", users);
  });

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
    messages: [],
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit("private message", message);
    messageStore.saveMessage(message);
    messageStore.saveUserChat(message);
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
      // if we want to cealre the session 
      // sessionStore.removeSession(socket.sessionID)
    }
  });
});
