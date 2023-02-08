<script setup lang="ts">
import { computed, ref } from "vue"
import VueCodeInput from "./components/VueCodeInput.vue"

const maxLength = ref(3)
const groupSize = ref(1)

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

const onComplete = (code: string, expectedCode: string) => {
  console.log("Completed", code === expectedCode ? "✅" : "❌")
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
    <p>
      Current code : {{ code }} <span>{{ code === expectedCode ? "✅" : "❌" }}</span>
    </p>
    <vue-code-input
      v-model="code"
      @completed="(code) => onComplete(code, expectedCode)"
      :max-length="maxLength"
      :group-size="groupSize"
    />
  </div>
  <div>
    <h2>Only numbers</h2>
    <p>Expected pin : {{ expectedPin }}</p>
    <p>
      Current pin : {{ pin }} <span>{{ pin === expectedPin ? "✅" : "❌" }}</span>
    </p>
    <vue-code-input
      v-model.pin="pin"
      @completed="(pinCode) => onComplete(pinCode, expectedPin)"
      :max-length="maxLength"
      :group-size="groupSize"
    />
  </div>
  <div>
    <h2>Prefix</h2>
    <vue-code-input :max-length="1" :groups="1" prefix="G" />
  </div>
  <div>
    <h2>Uppercase</h2>
    <p>Expected code : {{ expectedCode.toUpperCase() }}</p>
    <p>
      Current code : {{ code }} <span>{{ code === expectedCode.toUpperCase() ? "✅" : "❌" }}</span>
    </p>
    <vue-code-input
      v-model.uppercase="code"
      :max-length="maxLength"
      :group-size="groupSize"
      @completed="(code) => onComplete(code, expectedCode.toUpperCase())"
    />
  </div>
</template>
