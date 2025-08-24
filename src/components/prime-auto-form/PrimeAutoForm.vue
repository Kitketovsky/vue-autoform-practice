<script setup lang="ts" generic="T extends z.ZodObject<any, any>">
import { ref } from 'vue'
import z from 'zod'
import { getInitialFormState } from './utils'

const props = defineProps<{
  schema: T
}>()

// TODO: 'date' type is unavailable with z.toJSONSchema()
const json = z.toJSONSchema(props.schema)

const formState = ref(getInitialFormState(json))
</script>

<template>
  <div v-if="json.properties" class="p-10 space-y-8">
    <div v-for="[key, value] in Object.entries(json.properties)" :key="key">
      <p>{{ key }} : {{ JSON.stringify(value, null, 2) }}</p>
    </div>
  </div>
</template>
