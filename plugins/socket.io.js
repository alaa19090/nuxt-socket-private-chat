import io from "socket.io-client";
const socket = io(process.env.WS_URL,{
    autoConnect: false,
    debug: true,
});
socket.onAny((event, ...args) => {
    console.log(event, args);
  });
export default socket;
