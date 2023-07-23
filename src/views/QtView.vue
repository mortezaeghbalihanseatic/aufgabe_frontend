<script setup>

const props = defineProps({
  jsonData: {
    type: Object,
    default: () => ({}) 
  }
});
</script>

<template>
  <h1>View</h1>
  <h6>{{ probps.jsonData }}</h6>
</template>     