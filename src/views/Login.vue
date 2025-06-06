<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">Email</label>
                <input v-model="email"
                       type="email"
                       id="email"
                       data-testid="email-input"
                       required />
            </div>
            <div>
                <label for="password">Password</label>
                <input v-model="password"
                       type="password"
                       id="password"
                       data-testid="password-input"
                       required />
            </div>
            <button type="submit" data-testid="login-button">Login</button>
            <p v-if="error" class="error" data-testid="error-message">{{ error }}</p>
        </form>
        <router-link to="/register" data-testid="register-link">Register</router-link>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    export default {
        name: 'Login',
        setup() {
            const email = ref('')
            const password = ref('')
            const error = ref('')
            const users = ref([])
            const router = useRouter()

            onMounted(async () => {
                try {
                    const response = await fetch('/data/users.json')
                    if (!response.ok) throw new Error('Failed to fetch users')
                    users.value = await response.json()
                } catch (err) {
                    console.error('Error fetching users:', err)
                }
            })

            const handleLogin = () => {
                const user = users.value.find(
                    u => u.email === email.value && u.password === password.value
                )
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user))
                    router.push('/edit')
                } else {
                    error.value = 'Invalid email or password'
                }
            }

            return { email, password, error, handleLogin }
        }
    }
</script>

<style scoped>
    .login {
        max-width: 400px;
        margin: 0 auto;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .error {
        color: red;
    }
</style>
