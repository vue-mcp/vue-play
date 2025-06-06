<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required data-testid="email-input" />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required minlength="6" data-testid="password-input" />
      </div>
      <div>
        <label>First Name:</label>
        <input v-model="firstName" type="text" required data-testid="firstName-input" />
      </div>
      <div>
        <label>Last Name:</label>
        <input v-model="lastName" type="text" required data-testid="lastName-input" />
      </div>
      <div>
        <label>Zip:</label>
        <input v-model="zip" type="text" required pattern="[0-9]{5}" data-testid="zip-input" />
      </div>
      <div>
        <label>City:</label>
        <input v-model="city" type="text" required data-testid="city-input" />
      </div>
      <button type="submit" data-testid="register-button">Register</button>
      <p v-if="error" class="error" data-testid="error-message">{{ error }}</p>
      <p>Already have an account? <router-link to="/login" data-testid="login-link">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import users from '../data/users.json'

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      zip: '',
      city: '',
      error: ''
    }
  },
  methods: {
    handleRegister() {
      if (users.find(u => u.email === this.email)) {
        this.error = 'Email already exists'
        return
      }
      const newUser = {
        id: users.length + 1,
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        zip: this.zip,
        city: this.city
      }
      users.push(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      this.$router.push('/edit')
    }
  }
}
</script>

<style scoped>
.register {
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
.error {
  color: red;
}
</style>