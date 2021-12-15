<template>
  <div>
    <div>My blog navigation bar here</div>
    <contact></contact>
    <nuxt />
  </div>
</template>

<script>
import socket from "~/plugins/socket.io.js";
import Contact from "~/components/Contact";

export default {
  components:{
    Contact
  },
  middleware: ["auth-redirect"],
  name: "chat",
};
</script>
