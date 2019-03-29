<template>
  <div class="form">
    <h3 v-if="isAdd">Add User</h3>
    <h3 v-else>Edit UserID:{{editUserData.id}}</h3>

    <b-form-row>
      <b-form-input placeholder="Your Name" v-model="editUserData.name" type="text"></b-form-input>
      <b-form-input placeholder="Your UserName" v-model="editUserData.username" type="text"></b-form-input>
      <b-form-input placeholder="Your EmailAddress" v-model="editUserData.email" type="text"></b-form-input>
    </b-form-row>

    <b-btn-group>
      <b-button v-on:click="addUser" v-if="isAdd" >Save</b-button>
      <b-button v-on:click="editUser" v-else>Save change</b-button>
      <b-button v-on:click="clearForm(true)">clear</b-button>
      <b-button v-if="!isAdd" v-on:click="clearForm(false)">calcel</b-button>
    </b-btn-group>


  </div>
</template>

<script>
import api from "@/api";

export default {
  props: ["user"],
  data() {
    return {
      editUserData: this.user
    };
  },
  watch: {
    user(newValue) {
      this.editUserData = newValue;
    }
  },

  computed: {
    isAdd() {
      return this.editUserData.id == null;
    }
  },

  methods: {
    clearForm: function(preserveId) {
      if (preserveId) {
        this.editUserData = {
          id: this.editUserData.id
        };
      } else {
        this.editUserData = {
          id: null,
          name: "",
          username: "",
          email: ""
        };
      }
    },

    async addUser() {
      try {
        const responce = await api.post("/users", this.editUserData);
        console.log(responce);
        this.$emit("add", responce.data);
      } catch (error) {
        console.log(error);
      }
      this.clearForm(false);
    },

    async editUser() {
      try {
        const response = await api.put(
          `/users/${this.editUserData.id}`,
          this.editUserData
        );
        this.$emit("edit", response.data);
        this.clearForm(false);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

