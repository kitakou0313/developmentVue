<template>
  <div class="user">
    <h2>User's details</h2>
    <router-view/>
    <!-- here will be user list -->
    <h2>Here is User list</h2>
    <transition-group name="fade">
      <div v-for="(user) in users" :key="user.id">
        <div class="userIntro">
          <router-link :to="{name:'userDetail', params:{id:user.id}}">userid : {{user.id}}</router-link>
          <p>Name : {{user.name}}</p>
          <p>UserName : {{user.username}}</p>
          <p>Email : {{user.email}}</p>

          <p>{{user.showNameAndEmail()}}</p>
        </div>
        <button type="button" v-on:click="delUser(user.id);">Delete</button>
        <button type="button" v-on:click="editUserData={...user}">Edit</button>
      </div>
    </transition-group>

    <Userform :user="editUserData" v-on:add="addUser" v-on:edit="editUser"></Userform>
  </div>
</template>

<script>
import Userform from "@/components/userform";
import UserList from "@/assets/user-list.js";

import userClass from "@/classes/userclass.js"

import api from "@/api";

export default {
  name: "users",
  components: {
    Userform
  },
  data() {
    return {
      users: [],
      UsedId: UserList.length + 1,
      editUserData: {
        id: null,
        name: "",
        username: "",
        email: ""
      }
    };
  },



  async created() {
    try {
      const response = await api.get("/users");
      this.users = response.data.map((userData) => new userClass(userData));
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    isAdd() {
      return this.editUserData.id == null;
    }
  },
  methods: {
    delUser: function(deletedUserId) {
      //this.users.splice(ind, 1);
      api
        .delete(`/users/${deletedUserId}`)
        .then(response => {
          console.log(response);
          this.users.splice(
            this.users.findIndex(user => {
              return user.id == deletedUserId;
            }),
            1
          );
        })
        .catch(error => {
          console.log(error);
        });
    },

    addUser: function(newUser) {
      this.users.push(newUser);
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


