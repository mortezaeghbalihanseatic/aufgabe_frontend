<script setup>
import { ref } from "vue";
import axios from "axios";
import QuotesView from "./QuotesView.vue";

const _username = ref(null);
const _password = ref(null);
const message = ref(null);
const loading = ref(false);
const emit = defineEmits(["token"]);
const props = defineProps({
  api: String
})
const apiUrl = ref(null);
const result = ref(null);


apiUrl.value = props.api;

async function onSubmit() {
  message.value = "Please wait ...";
  loading.value = true;

  axios
    .post(`${apiUrl.value}/api/login`, {
      username: _username.value,
      password: _password.value,
    })
    .then((response) => {
      message.value = "Success ...";

      emit("token", response.data.token);

      loading.value = false;
    })
    .catch((error) => {

      message.value = `${apiUrl.value}/api/login`;
      loading.value = false;
    });
}
</script>

<template>
  <div class="login-container">
    <h3>Login</h3>
    <h6>{{ apiUrl }}</h6>

    <input
      type="text"
      :disabled="loading"
      v-model="_username"
      placeholder="Username"
      class="input-field"
    />
    <input
      type="password"
      :disabled="loading"
      v-model="_password"
      placeholder="Password"
      class="input-field"
    />
    <button @click="onSubmit" :disabled="loading" class="login-button">Login</button>
    <p>
      <span>{{ message }} </span>
    </p>
  </div>
</template>

<style>
/* Styles for the login container */
.login-container {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

/* Styles for the heading */
h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

/* Styles for the apiUrl */
h6 {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

/* Styles for the input fields */
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* Styles for the login button */
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Styles for the message paragraph */
p {
  margin-top: 10px;
}

/* Styles for the message text */
span {
  font-size: 14px;
  color: #f00;
}
</style>
