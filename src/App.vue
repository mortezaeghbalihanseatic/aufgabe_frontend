<script setup lang="ts">
import { computed, ref } from "vue";
import LoginView from "./views/LoginView.vue";
import QuotesView from "./views/QuotesView.vue";
import Quotes2View from "./views/Quotes2View.vue";


const loginToken = ref("");
const api_url = ref('nothing in app');
const { API_URI } = defineProps(['API_URI']);

api_url.value = API_URI;

const isTokenExists = computed(() => loginToken.value.length > 1);

</script>

<template>
  <Quotes2View v-if="isTokenExists" :token=loginToken :api="api_url" /> 
  <LoginView v-else="isTokenExists" :api="api_url" @token="(result) => (loginToken = result)" />
</template>
