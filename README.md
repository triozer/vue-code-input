# vue-code-input

A Vue 3 plugin that exports a component for a code input field. It has various features to make entering codes easy and flexible.

## Features
- Regex support for input validation
- Ability to split the code into groups for better readability
- Auto-validate option to validate the input as the user types

## Installation
You can install the plugin through npm:

```shell
pnpm install @triozer/vue-code-input
```

## Props

The code input component accepts the following props:

- `regex`: A string pattern that the input must match to be considered valid.
- `groupSize`: The number of characters in each group.
- `autoValidate`: A boolean value indicating whether the input should be automatically validated as the user types.

## Events

The code input component emits the following events:

- `input`: Emitted whenever the input value changes.
validated: Emitted when the input has been validated.
- `complete`: Emitted when the input has been filled.

## Example
Here is an example of how you might use the code input component with the autoValidate prop set to true:

```vue
<script lang="ts" setup>
import { CodeInput } from 'vue-code-input'
</script>

<template>
  <code-input :autoValidate="true" />
</template>
```

## Contributing
If you want to contribute to the development of this plugin, please feel free to open a pull request on GitHub.