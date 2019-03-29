<template>
  <b-container>
    <router-view/>
    <!-- here will be user list -->
    <h2>Here is User list</h2>
    <b-button v-b-modal.Userform>Add User</b-button>
    <b-row>
      <b-col>
        <b-table striped hover :items="users" :fields="fields">
          <template v-slot:name="cell">
            <router-link :to="{name:'userDetail',params:{id:cell.item.id}}">{{cell.value}}</router-link>
            {{cell.unformatted}}
          </template>

          <template v-slot:action="cell">
            <b-btn-group>
              <b-button v-on:click="delUser(cell.item.id);">Delete</b-button>
              <b-button v-b-modal.Userform v-on:click="editUserData={...cell.item}">Edit</b-button>
            </b-btn-group>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal id="Userform" title="Edit User">
      <Userform :user="editUserData" v-on:add="addUser" v-on:edit="editUser"></Userform>
    </b-modal>

  </b-container>
</template>

<script>
import Userform from "@/components/userform";
import UserList from "@/assets/user-list.js";

import userClass from "@/classes/userclass.js";

import api from "@/api";

export default {
  name: "users",
  components: {
    Userform
  },
  data() {
    return {
      fields: [
        {
          key: "id",
          sortable: true
        },
        {
          key: "name",
          sortable: true,
          formatter: (val, key, item) => {
            return item.showNameAndEmail();
          }
        },
        {
          key: "username",
          sortable: true
        },
        "email",
        "action"
      ],
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
      this.users = response.data.map(userData => new userClass(userData));
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
      this.users.push(new userClass(newUser));
    },

    editUser: function(editedUser) {
      this.users.splice(
        this.users.findIndex(user => {
          return user.id == editedUser.id;
        }),
        1,
        new userClass(editedUser)
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


