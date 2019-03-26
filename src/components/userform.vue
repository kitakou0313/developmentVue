<template>
  <div class="form">
    <h3 v-if="isAdd">Add User</h3>
    <h3 v-else>Edit UserID:{{editUserData.id}}</h3>

    <input placeholder="Your Name" v-model="editUserData.name" type="text">
    <input placeholder="Your UserName" v-model="editUserData.username" type="text">
    <input placeholder="Your EmailAddress" v-model="editUserData.email" type="text">
    
    <button type="button" v-on:click="addUser" v-if="isAdd">Save</button>
    <button type="button" v-on:click="editUser" v-else>Save change</button>
    
    <button type="button" v-on:click="clearForm(true)">clear</button>
    <button type="button" v-if="!isAdd" v-on:click="clearForm(false)">calcel</button>
  </div>
</template>

<script>
import api from "@/api"

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

    addUser: function() {
      api.post("/users",this.editUserData)
        .then((response)=> {
          console.log(response);
          this.$emit("add",response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      
      this.clearForm(false);
    },

    async editUser() {
      try{
        const response = await api.put(`/users/${this.editUserData.id}`,this.editUserData);
        this.$emit("edit", response.data);
        this.clearForm(false);
      }catch(error){
        console.log(error);
      }
    }
  }
};
</script>

