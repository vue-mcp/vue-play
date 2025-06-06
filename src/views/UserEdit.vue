<template>
  <div class="user-edit">
    <h2>Edit Profile</h2>
    <form @submit.prevent="handleUpdate">
      <div>
        <label>Email:</label>
        <input v-model="user.email" type="email" required disabled data-testid="email-input" />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="user.password" type="password" required minlength="6" data-testid="password-input" />
      </div>
      <div>
        <label>First Name:</label>
        <input v-model="user.firstName" type="text" required data-testid="firstName-input" />
      </div>
      <div>
        <label>Last Name:</label>
        <input v-model="user.lastName" type="text" required data-testid="lastName-input" />
      </div>
      <div>
        <label>Zip:</label>
        <input v-model="user.zip" type="text" required pattern="[0-9]{5}" data-testid="zip-input" />
      </div>
      <div>
        <label>City:</label>
        <input v-model="user.city" type="text" required data-testid="city-input" />
      </div>
      <button type="submit" data-testid="update-button">Update</button>
      <p v-if="success" class="success" data-testid="success-message">Profile updated successfully</p>
    </form>
  </div>
</template>

<script>
import users from '../data/users.json'

export default {
  name: 'UserEdit',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      success: false
    }
  },
  methods: {
    handleUpdate() {
      const index = users.findIndex(u => u.id === this.user.id)
      if (index !== -1) {
        users[index] = { ...this.user }
        localStorage.setItem('user', JSON.stringify(this.user))
        this.success = true
        setTimeout(() => (this.success = false), 2000)
      }
    }
  }
}
</script>

<style scoped>
.user-edit {
  max-width: 400px;
  margin: auto;
}
form div {
  margin-bottom: 1rem;
}
label {
  display: block;
}
input {
  width: 100%;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
.success {
  color: green;
}
</style>