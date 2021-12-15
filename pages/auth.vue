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
      <button @click="$auth.logout()">logout</button>
    </div>
  </div>
</template>
<script>
import socket from "~/plugins/socket.io.js";

export default {
  data() {
    return {
      user: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        let response = await this.$auth.loginWith("local", {
          data: loginInfo,
        });
        // console.log(response.data);
        // this.onUsernameSelection(response.data.success);
      } catch (e) {
        console.log(e + "dddddddd");
      }

      this.loading = false;
    },
    onUsernameSelection(username) {
      socket.auth = { username };
      socket.connect();
    },
  },
};
</script>
