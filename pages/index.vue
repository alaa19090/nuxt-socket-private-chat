<template>
  <div id="app">
    <select-username v-show="!this.$auth.loggedIn" />
    <chat v-show="this.$auth.loggedIn" />
  </div>
</template>

<script>
import SelectUsername from "~/components/SelectUsername";
import Chat from "~/components/Chat";

export default {
  name: "App",
  layout: "chat",
  components: {
    Chat,
    SelectUsername,
  },
  computed: {
    fff() {
     let user_on_server =  [
  {
    userID: 106135197885743,
    username: 'asasa sassasa',
    user_object: {
      username: 'sklk1285056',
      user_id: 106135197885743,
      full_name: 'asasa sassasa',
      following: [Array]
    },
    connected: true
  },
  {
    userID: 593223141784574,
    username: 'Abdulkadir     ',
    user_object: {
      username: 'Admin',
      user_id: 593223141784574,
      full_name: 'Abdulkadir     ',
      following: [Array]
    },
    connected: true
  }
]
 let user_frinds= [
  83233141784904,
  104191690135160,
  104359901875515,
  108707020350023,
  109203481539052,
  109694326385288,
  110113565040066,
  111512047423584,
  120228856548546,
  126485969517918,
  130905431651154,
  146067755247095,
  153546331902499,
  161376751866563,
  163983642730896,
  169898402993196,
  172290568387450,
  180707662096581,
  185042868961007,
  185134083228867,
  185281161344224,
  185696740803729,
  565293142152262,
  593223141784574,
  745433142252716,
  783193142162510
 ]
      // First one :
      let one = [1,2,3,4];

      // Second one :
      let two = [
        { id: 10 },
        { id: 1,
        op:'ssss' },
        { id: 4 },
        { id: 76 },
        { id: 2 },
        { id: 47 },
        { id: 3 },
      ];
      // let result = one.map((a) => a.id);
      // let result2 = two.map((a) => a.id);
      // const final_result = result.every((val) => result2.includes(val));

      const id_filter = new Set(user_frinds);
      const res = user_on_server.filter(({ userID }) => id_filter.has(userID));
      return res;
    },
  },
};
</script>

