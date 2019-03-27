<template>
  <div class="user-details">
    <h3>User component</h3>
    <p>id:{{user.id}}</p>
    <p>Name:{{user.name}}</p>
    <p>Username:{{user.username}}</p>
    <p>UserEmail:{{user.email}}</p>

    
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "user-details",
  props: ["id"],

  data() {
    return {
      user: {
        id: null,
        name: "",
        username: "",
        email: ""
      }
    };
  },

  async created() {
    this.changeUserData(this.id);
  },

  watch: {
    id(newValue) {
     this.changeUserData(newValue);
    }
  },

  methods: {
    async changeUserData(userid){
      try{
        const response = await api.get(`/users/${userid}`);
        this.user = response.data;
      } catch (error){
        console.log(error);
      }
    }
  }

};
</script>
