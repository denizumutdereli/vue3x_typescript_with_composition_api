<template>
<main class="form-signin">
    <form @submit.prevent="handleFormSubmit">
        <h1 class="h3 mb-3 fw-normal">Please register</h1>

        <span class="text-danger" v-show="error">{{message}}</span>
        <hr />

        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="name@example.com" required v-model="email" />
            <label for="floatingInput">Email address</label>
        </div>

        <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" />
            <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating">
            <input type="password" class="form-control" id="confirmPassword" placeholder="Please confirm your password" required v-model="confirmPassword" />
            <label for="floatingInput">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit" :disabled="error">
            Register
        </button>
    </form>

    <div class="mb-3">
        <br />
        <router-link to="/login" class="mb-3 fw-normal">Existing user?</router-link>
    </div>

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
    name: "Register",

    setup() {
        const message = ref('');
        const error = ref(false);
        const email = ref("");
        const password = ref("");
        const confirmPassword = ref("");
        const router = useRouter();

        const showMessage = (e: string) => {
            error.value = true;
            message.value = e;
            setTimeout(

                () => {
                    error.value = false
                }, 4000

            );
        };

        const handleFormSubmit = async () => {

            await axios.post("user", {
                    username: email.value,
                    role: 'seller',
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                }).then(response => {
                    const promise = response.data;
                    /* tslint:disable-next-line */
                    if (promise.status === false) {

                        showMessage(promise.error);

                    } else {
                        router.push('/')
                    }

                })
                .catch((e) => console.log(e))
        };

        return {
            error,
            message,
            email,
            password,
            confirmPassword,
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
