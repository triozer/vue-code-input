import type { App } from "vue"

interface VuePluginOptions {}

export function install(app: App, options?: VuePluginOptions) {
  console.debug("Installing @triozer/vue-code-input")
}
