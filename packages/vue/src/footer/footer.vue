<script setup lang="ts">
import { cn } from "@75neo/themes";
import FooterBottom from "./bottom.vue";
import FooterCenter from "./center.vue";
import FooterEnd from "./end.vue";
import FooterRow from "./row.vue";
import FooterStart from "./start.vue";
import FooterTop from "./top.vue";

/*
 * The five regions are named slots, so the default slot is left free to compose the
 * parts directly. Filling it replaces the composed row rather than adding to it.
 */
const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  /** Composes the parts directly, in place of the row. */
  default?: () => unknown;
  /** A full-width band above the row. */
  top?: () => unknown;
  /** The start of the row, usually a copyright line. */
  start?: () => unknown;
  /** The middle of the row, usually a short navigation. */
  center?: () => unknown;
  /** The end of the row, usually social or legal links. */
  end?: () => unknown;
  /** A full-width band below the row. */
  bottom?: () => unknown;
}>();
</script>

<template>
  <footer data-slot="footer" :class="cn(props.class as string | undefined)">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <FooterTop v-if="$slots.top">
        <slot name="top" />
      </FooterTop>
      <FooterRow>
        <FooterEnd>
          <slot name="end" />
        </FooterEnd>
        <FooterCenter>
          <slot name="center" />
        </FooterCenter>
        <FooterStart>
          <slot name="start" />
        </FooterStart>
      </FooterRow>
      <FooterBottom v-if="$slots.bottom">
        <slot name="bottom" />
      </FooterBottom>
    </template>
  </footer>
</template>
