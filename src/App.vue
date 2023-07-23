<script setup lang="ts">
import { computed, ref } from "vue";
import LoginView from "./views/LoginView.vue";
import QuotesView from "./views/QuotesView.vue";

const loginToken = ref("");
const isTokenExists = computed(() => loginToken.value.length > 1);

</script>

<template>

  <QuotesView v-if="isTokenExists" :token=loginToken /> 
  <LoginView v-else="isTokenExists" @token="(result) => (loginToken = result)" />

</template>
