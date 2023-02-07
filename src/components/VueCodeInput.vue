<script lang="ts" setup>
import { computed, onMounted, ref, watch, type PropType } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  modelModifiers: {
    type: Object as PropType<{ pin: boolean }>,
    required: false,
    default: () => ({}),
  },
  maxLength: {
    type: Number,
    default: 4,
    validator: (value: number) => value > 0,
  },
  regex: {
    type: RegExp,
    default: /^[A-z0-9]$/,
  },
  groupSize: {
    type: Number,
    default: 4,
    validator: (value: number) => value > 0,
  },
  prefix: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
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

const pattern = computed(() => (props.modelModifiers.pin ? /^[0-9]$/ : props.regex))

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "Backspace") {
    event.preventDefault()

    if (event.key === "Backspace" && currentInput.value.value.length !== 0) {
      value.value = value.value.slice(0, currentInputIndex.value)
      for (let i = currentInputIndex.value; i < props.maxLength; i++) {
        inputs.value[i].value = ""
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

  if (event.key.match(pattern.value)) {
    currentInput.value.value = ""
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  if (event.key.match(pattern.value)) {
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

const groups = computed(() => Math.ceil(props.maxLength / props.groupSize))

watch(currentInputIndex, () => {
  currentInput.value.focus()
})

onMounted(() => {
  currentInput.value.focus()
})
</script>

<template>
  <div class="container" @keydown="handleKeydown" @keyup="handleKeyup">
    <template v-if="props.prefix">
      <span class="prefix">{{ props.prefix }}</span>
    </template>
    <template v-for="i in groups" :key="`group-${i}`">
      <input
        ref="inputs"
        v-for="j in Math.min(groupSize, maxLength - (i - 1) * groupSize)"
        @mousedown="(e) => handleItemClick(e, (i - 1) * props.groupSize + j - 1)"
        :key="j"
        @focus="changeCurrentInputIndex((i - 1) * props.groupSize + j - 1)"
        class="item"
        :type="props.modelModifiers.pin ? 'number' : 'text'"
        :pattern="props.modelModifiers.pin ? '[0-9]*' : props.regex.source"
        maxlength="1"
        :disabled="disabled"
      />
      <span v-if="i !== groups" class="separator">-</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 0.25rem;
}

.separator,
.prefix,
.item {
  height: 1em;
  padding: 0.5em;
  font-size: 2em;
  text-align: center;
}

.separator,
.item {
  width: 1em;
}

.item {
  appearance: textfield;

  border: 1px solid grey;
  border-radius: 0.25em;
  caret-color: transparent;

  transition: border 0.2s ease-in-out;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border: 1px solid blue;
  }
}
</style>
