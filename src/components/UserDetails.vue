<template>
  <div class="user-details">
    <b-card header-text-variant="white" header-bg-variant="dark">
      <template slot="header">Details about {{user.name}}</template>

      <b-list-group>
        <b-list-group-item>id:{{user.id}}</b-list-group-item>
        <b-list-group-item>Name:{{user.name}}</b-list-group-item>
        <b-list-group-item>Username:{{user.username}}</b-list-group-item>
        <b-list-group-item>UserEmail:{{user.email}}</b-list-group-item>
      </b-list-group>

      <template slot="footer">
        <router-link :to="{name:'users'}">
          <b-btn-close></b-btn-close>
        </router-link>
      </template>
    </b-card>
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
    async changeUserData(userid) {
      try {
        const response = await api.get(`/users/${userid}`);
        this.user = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
