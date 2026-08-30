import type { Component } from "vue";

/**
 * `storybook-vue-addon` compiles `*.stories.vue` files, whose templates use the global
 * `<Stories>` / `<Story>` elements, into CSF at build time. The addon ships its own global
 * registration in `storybook-vue-addon/core`, but types the `component` prop as a bare
 * `DefineComponent`, which no real SFC satisfies — so we register them here instead.
 */
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    /** Root element of a `*.stories.vue` file; becomes the CSF default export. */
    Stories: new () => {
      $props: { title?: string; component?: Component };
      $slots: { default?: () => unknown };
    };
    /** One named story export. `play` must be defined in a plain `<script>` block. */
    Story: new () => {
      $props: { title: string; play?: (context: never) => unknown };
      $slots: { default?: () => unknown };
    };
  }
}
