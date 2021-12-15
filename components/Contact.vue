<template>
  <div></div>
</template>
<script>
import socket from "~/plugins/socket.io.js";

export default {
  name: "Contact",
  data: () => ({
    usernameAlreadySelected: false,
  }),
  methods: {
    onUsernameSelection(username) {
      this.usernameAlreadySelected = true;
      socket.auth = { username };
      socket.connect();
    },
  },
  beforeMount() {
    const sessionID = localStorage.getItem("sessionID");
    if (this.$auth.loggedIn) {
      console.log(this.$auth.user.username);
      this.onUsernameSelection(this.$auth.user.username);
    }

    if (sessionID) {
      this.usernameAlreadySelected = true;
      socket.auth = { sessionID };
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

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });
  },
  destroyed() {
    socket.off("connect_error");
  },
};
</script>
