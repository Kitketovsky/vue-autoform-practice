<script setup lang="ts">
import PrimeAutoForm from './components/prime-auto-form/PrimeAutoForm.vue'
import { schema } from './schemas/full'
</script>

<template>
  <PrimeAutoForm :schema="schema" />
</template>

<style scoped></style>
