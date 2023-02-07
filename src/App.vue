<script setup lang="ts">
import { ref } from "vue"
import VueCodeInput from "./components/VueCodeInput.vue"

const code = ref("")

const onComplete = (code: string) => {
  console.log("Completed", code)
}
</script>

<template>
  Current code : {{ code }}
  <vue-code-input v-model="code" @completed="onComplete" :max-length="6" :group-size="3" />
</template>
