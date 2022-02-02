<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt />
  </div>
</template>

<script>
import socket from "~/plugins/socket.io.js";

export default {
  middleware: ["auth-redirect"],
  name: "chat",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    playSound(url) {
      const audio = new Audio(url);
      audio.play();
    },
  },
  created() {
    if (process.client) {
      const following = this.$auth.user.following.map((x) => x.user_id);
      const ob = {
        username: this.$auth.user.username,
        user_id: this.$auth.user.user_id,
        full_name: this.$auth.user.full_name,
        following: following,
      };
      const sessionID = localStorage.getItem("sessionID");

      if (sessionID) {
        console.log(ob);
        socket.auth = { sessionID, username: ob.full_name, user_object: ob };
        socket.connect();
      }

      socket.on("session", ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
      });

      socket.on("users", (users) => {
        users.forEach((user) => {
          user.messages.forEach((message) => {
            message.fromSelf = message.from === socket.userID;
          });
          for (let i = 0; i < this.users.length; i++) {
            const existingUser = this.users[i];
            if (existingUser.userID === user.userID) {
              existingUser.connected = user.connected;
              existingUser.messages = user.messages;
              return;
            }
          }
          user.self = user.userID === socket.userID;
          this.users.push(user);
        });
        this.$store.dispatch("add_users", this.users);
      });

      socket.on("private message", ({ content, from, to }) => {
        this.playSound("/Notification.mp3");
      });

      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          // this.usernameAlreadySelected = false;
          console.log("invalid username");
        }
      });
    }
  },
};
</script>
