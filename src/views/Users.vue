<template>
  <div class="user">
    <h2>User's details</h2>
    <user-details/>
    <!-- here will be user list -->
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
      users: UserList
    }
  }
}
</script>

