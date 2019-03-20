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
      this.$emit("add",this.editUserData)
      this.clearForm(false);
    },

    editUser: function() {
      this.$emit("edit",this.editUserData);
      this.clearForm(false);
    }
  }
};
</script>

