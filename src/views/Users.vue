<template>
  <div class="user">
    <h2>User's details</h2>
    <UserDetails/>
    <!-- here will be user list -->
    <h2>Here is User list</h2>
    <transition-group name="fade">
      <div v-for="(user, index) in users" :key="user.id">
        <div class="userIntro">
          <p>userid : {{user.id}}</p>
          <p>Name : {{user.name}}</p>
          <p>UserName : {{user.username}}</p>
          <p>Email : {{user.email}}</p>
        </div>
        <button type="button" v-on:click="delUser(index);">Delete</button>
        <button type="button" v-on:click="flg = false; editUserData={...user}">Edit</button>
      </div>
    </transition-group>

    <Userform :user="editUserData" v-on:add="addUser" v-on:edit="editUser"></Userform>
  </div>
</template>

<script>
import UserDetails from "@/components/UserDetails";
import Userform from "@/components/userform";

import UserList from "@/assets/user-list.js";

export default {
  name: "users",
  components: {
    UserDetails,
    Userform
  },
  data() {
    return {
      users: UserList,
      UsedId: UserList.length + 1,
      editUserData: {
        id: null,
        name: "",
        username: "",
        email: ""
      }
    };
  },

  computed: {
    isAdd() {
      return this.editUserData.id == null;
    }
  },
  methods: {
    delUser: function(ind) {
      this.users.splice(ind, 1);
    },
    addUser: function(newUser) {
      this.users.push({
        ...newUser,
        id: this.UsedId
      });
      this.UsedId++;
    },

    editUser: function(editedUser) {
      this.users.splice(
        this.users.findIndex(user => {
          return user.id == editedUser.id;
        }),
        1,
        editedUser
      );
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


