<template>
<main class="form-signin" @submit.prevent="handleFormSubmit">
    <form>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required v-model="email" />
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required v-model="password" />
            <label for="floatingPassword">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
        </button>

        <div class="mb-3">
            <br />
            <router-link to="/register" class="mb-3 fw-normal">New user?</router-link>

        </div>

    </form>
</main>
</template>

<script lang="ts">
import {
    ref
} from "vue";
import axios from "axios";
import {
    useRouter
} from "vue-router";

export default {
    name: "Login",

    setup: () => {
        const email = ref("");
        const password = ref("");
        const router = useRouter();
        const handleFormSubmit = async () => {

            const response = await axios.post('auth', {
                username: email.value,
                password: password.value
            });

            if (response.data.status == false) {
                console.log(response.data.error)
            } else {
                //set token to the localstorage
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${response.data.token}`
                }
                router.push('/');
            }

        }

        return {
            email,
            password,
            handleFormSubmit,
        };
    },

};
</script>

<style scoped>
html,
body {
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
