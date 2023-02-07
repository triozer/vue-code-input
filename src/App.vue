<script setup lang="ts">
import { computed, ref } from "vue"
import VueCodeInput from "./components/VueCodeInput.vue"

const maxLength = ref(6)
const groupSize = ref(2)

const code = ref("")
const expectedCode = computed(() => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < maxLength.value; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
})

const pin = ref("")
const expectedPin = computed(() =>
  Math.floor(Math.random() * 10 ** maxLength.value)
    .toString()
    .padStart(maxLength.value, "0")
)

const onComplete = (code: string) => {
  console.log("Completed", code)
}
</script>

<template>
  <h1>Vue Code Input</h1>
  <div>
    <h2>Options</h2>
    <label>
      Max length =
      <input type="number" v-model.number="maxLength" />
    </label>
    <label>
      Group size =
      <input type="number" v-model.number="groupSize" />
    </label>
  </div>
  <div>
    <h2>Any chars</h2>
    <p>Expected code : {{ expectedCode }}</p>
    <p>Current code : {{ code }}</p>
    <vue-code-input
      v-model="code"
      @completed="onComplete"
      :max-length="maxLength"
      :group-size="groupSize"
    />
  </div>
  <div>
    <h2>Only numbers</h2>
    <p>Expected pin : {{ expectedPin }}</p>
    <p>Current pin : {{ pin }}</p>
    <vue-code-input
      v-model.pin="pin"
      @completed="onComplete"
      :max-length="maxLength"
      :group-size="groupSize"
    />
  </div>
</template>
