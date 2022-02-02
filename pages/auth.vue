<template>
  <div>
    <div v-if="!$auth.loggedIn">
      <input type="text" v-model="user.user" />
      <input type="text" v-model="user.password" />
      <button @click.prevent="loginUser(user)">dddd</button>
    </div>
    <div v-else>
      loggedIn
      <nuxt-link to="/test">message test</nuxt-link>
      <nuxt-link to="/">home</nuxt-link>
      <button @click="logout()">logout</button>
    </div>
  </div>
</template>
<script>
import socket from "~/plugins/socket.io.js";

export default {
  data() {
    return {
      users: [],
      user: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      // socket.off("connect");
      // socket.off("disconnect");
      // socket.off("users");
      // socket.off("user connected");
      // socket.off("user disconnected");
      // socket.off("private message");
    },
    async loginUser(loginInfo) {
      try {
        let response = await this.$auth.loginWith("local", {
          data: loginInfo,
        });
        const following = this.$auth.user.following.map((x) => x.user_id);
        this.onUsernameSelection({
          username: this.$auth.user.username,
          user_id: this.$auth.user.user_id,
          full_name: this.$auth.user.full_name,
          following: following,
        });
      } catch (e) {
        console.log(e + "dddddddd");
        // console.log(this.$nuxt);
      }

      this.loading = false;
    },
    onUsernameSelection(ob) {
      // this.usernameAlreadySelected = true;
      socket.auth = { username: ob.full_name, user_object: ob };
      socket.connect();
    },
    // onUsernameSelection(username) {
    //   this.usernameAlreadySelected = true;
    //   socket.auth = { username };
    //   socket.connect();
    // },
  },
  created() {
    if (process.client) {
      // const following = this.$auth.user.following.map((x) => x.user_id);
      // const ob = {
      //   username: this.$auth.user.username,
      //   user_id: this.$auth.user.user_id,
      //   full_name: this.$auth.user.full_name,
      //   following: following,
      // };
      // const sessionID = localStorage.getItem("sessionID");

      // if (sessionID) {
      //   socket.auth = { sessionID, username: ob.full_name, user_object: ob };
      //   socket.connect();
      // }

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
      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          this.usernameAlreadySelected = false;
        }
      });
    }
  },

  destroyed() {
    socket.off("connect_error");
  },
};
</script>
