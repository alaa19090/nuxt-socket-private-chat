<template>
  <div>
    
    <!-- <select-username  @input="onUsernameSelection" /> -->
    <chat v-if="$auth.loggedIn" />
    <div class="align-center">
    <nuxt-link to="/auth">auth</nuxt-link>
    <nuxt-link to="/">home</nuxt-link>
    </div>
  </div>
</template>

<script>
import socket from "~/plugins/socket.io.js";
import SelectUsername from "~/components/SelectUsername";
import Chat from "~/components/Chat";

export default {
   layout: "chat",
  components: {
    Chat,
    SelectUsername,
  },
  data() {
    return {
      usernameAlreadySelected: false,
    };
  },

  
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}

html,
input {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  word-wrap: break-word;
}

/* Pages */

.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

.page {
  height: 100%;
  position: absolute;
  width: 100%;
}

/* Font */

.messages {
  font-size: 150%;
}

.inputMessage {
  font-size: 100%;
}

.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}

/* Messages */

.chatArea {
  height: 100%;
  padding-bottom: 60px;
}

.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}

/* Input */

.inputMessage {
  border: 10px solid #3b8070;
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
}
</style>
