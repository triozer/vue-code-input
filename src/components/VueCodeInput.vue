<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  maxLength: {
    type: Number,
    default: 4,
  },
  regex: {
    type: RegExp,
    default: /^[A-z0-9]$/,
  },
})

const emit = defineEmits(["update:modelValue", "completed"])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const inputs = ref<HTMLInputElement[]>([])
const currentInputIndex = ref(0)
const currentInput = computed(() => inputs.value[currentInputIndex.value])

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "Backspace") {
    event.preventDefault()

    if (event.key === "Backspace" && currentInput.value.value.length !== 0) {
      value.value = value.value.slice(0, currentInputIndex.value)
      for (let i = currentInputIndex.value; i < props.maxLength; i++) {
        inputs.value[i].value = ""
      }

      if (currentInputIndex.value !== value.value.length - 1) {
        return
      }
    }

    if (currentInputIndex.value > 0) {
      currentInputIndex.value--
    }

    return
  }

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault()

    if (
      value.value.length >= currentInputIndex.value + 1 &&
      currentInputIndex.value < props.maxLength - 1
    ) {
      currentInputIndex.value++
    }

    return
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  if (event.key.match(props.regex)) {
    handleInput(event.key)
    currentInputIndex.value = Math.min(currentInputIndex.value + 1, props.maxLength - 1)
  }
}

const handleItemClick = (event: MouseEvent, index: number) => {
  if (value.value.length > index) {
    return
  }

  event.preventDefault()
  event.stopPropagation()

  const currentIndex = Math.max(0, value.value.length)
  currentInputIndex.value = currentIndex
  currentInput.value.focus()
}

const changeCurrentInputIndex = (index: number) => {
  currentInputIndex.value = index
}

const handleInput = (key: string) => {
  currentInput.value.value = key

  const newValue = value.value.split("")
  newValue[currentInputIndex.value] = key
  value.value = newValue.join("")

  if (newValue.length === props.maxLength) {
    emit("completed", newValue.join(""))
  }
}

watch(currentInputIndex, () => {
  currentInput.value.focus()
})

onMounted(() => {
  currentInput.value.focus()
})
</script>

<template>
  <div class="container" @keydown="handleKeydown" @keyup="handleKeyup">
    <input
      ref="inputs"
      v-for="i in maxLength"
      @mousedown="(e) => handleItemClick(e, i - 1)"
      @focus="changeCurrentInputIndex(i - 1)"
      :key="i"
      class="item"
      type="text"
      maxlength="1"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 0.25rem;
}

.item {
  height: 1em;
  width: 1em;
  padding: 0.5em;
  font-size: 2em;
  text-align: center;
  border: 1px solid grey;
  border-radius: 0.25em;
  caret-color: transparent;

  transition: border 0.2s ease-in-out;

  &:focus {
    border: 1px solid blue;
  }
}
</style>
