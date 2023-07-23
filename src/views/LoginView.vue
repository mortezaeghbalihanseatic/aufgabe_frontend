<script setup>
import { ref  } from "vue";
import axios from "axios";
import QuotesView from "./QuotesView.vue";

const _username = ref(null);
const _password = ref(null);
const message = ref(null);
const loading = ref(false);
const emit = defineEmits(['token'])

const result = ref(null);

async function onSubmit() {
  message.value = "Please wait ...";
  loading.value = true;

  axios
    .post("http://localhost/api/login", {
      username: _username.value,
      password: _password.value,
    })
    .then((response) => {

      message.value = "Success ..."

      emit('token', response.data.token );



      loading.value = false;
    })
    .catch((error) => {
      message.value = error.message;
      loading.value = false;
    });
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <input
      type="text"
      :disabled="loading"
      v-model="_username"
      placeholder="Username"
    />
    <input
      type="password"
      :disabled="loading"
      v-model="_password"
      placeholder="Password"
    />
    <button @click="onSubmit" :disabled="loading">Login</button>
    <p>
      <span>{{ message }} </span>
    </p>
  </div>
</template>
