<template>
  <div class="user">
    <h2>User's details</h2>
    <UserDetails/>
    <!-- here will be user list -->
    
    <h2>Here is User list</h2>
    <transition-group name="fade">
    <div v-for="(user, index) in users" :key="user.id">
      <div class="userIntro">
        <p>userid : {{user.id}} </p>
        <p>Name : {{user.name}}</p>
        <p>UserName : {{user.username}}</p>
        <p>Email : {{user.email}}</p>
      </div>
      <button type="button" v-on:click="flg = true; delUser(index);">Delete</button>
      <button type="button" v-on:click="flg = false; editIndex=index">Edit</button>
    </div>
    </transition-group>
    
    
    <div class="addUser-form" v-if="flg" key=1>
      <h3>Add User</h3>
      <input placeholder="Your Name" v-model="newName" type="text">
      <input placeholder="Your UserName" v-model="newUserName" type="text">
      <input placeholder="Your EmailAddress" v-model="newEmail" type="text">  

      <button type="button" v-on:click="addUser">Save</button>

      <button type="button" v-on:click="clearForm">clear</button>
    </div>
    
    <div class="editUser-form" v-else key=2>
      <h3>Edit UserID:{{users[editIndex].id}}</h3>
      <input :placeholder=users[editIndex].name v-model="newName" type="text">
      <input :placeholder=users[editIndex].username v-model="newUserName" type="text">
      <input :placeholder=users[editIndex].email v-model="newEmail" type="text">  
      <button type="button" v-on:click="editUser">Save change</button>

      <button type="button" v-on:click="clearForm">clear</button>
      <button type="button" v-on:click="flg = true">calcel</button>
    </div>
    
  </div>

</template>

<script>
import UserDetails from '@/components/UserDetails'

import UserList from '@/assets/user-list.js'

export default {
  name: 'users',
  components: {
    UserDetails
  },
  data() {
    return {
      users: UserList,
      newName:"",
      newUserName:"",
      newEmail:"",
      UsedId : UserList.length +1,
      flg:true,
      editIndex:null
    }
  },
  methods:{
    delUser:function(ind){
      this.users.splice(ind,1);
    },

    clearForm:function(){
      this.newName="";
      this.newUserName=""; 
      this.newEmail="";
    },

    addUser:function(){
      this.users.push(
        {
      id:this.UsedId,
      name:this.newName ,
      username:this.newUserName ,
      email: this.newEmail,
      }
      );
      this.UsedId++;
      this.clearForm();
    },
    
    editUser:function(){
      this.users.splice(this.editIndex,1,
      {
        id:this.users[this.editIndex].id,
        name:this.newName ,
        username:this.newUserName ,
        email: this.newEmail,
      });
      this.flg = true;
      this.editIndex = null;

      this.clearForm();
    },
    
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


