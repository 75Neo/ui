<script setup lang="ts">
import { type Component, provide, reactive } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { hoverCardDefaults, type HoverCardRootProps } from "@75neo/themes";
import { hoverCardVariantsKey } from "./variants";
import HoverCardArrow from "./arrow.vue";
import HoverCardBody from "./body.vue";
import HoverCardContent from "./content.vue";
import HoverCardDescription from "./description.vue";
import HoverCardTitle from "./title.vue";

const props = withDefaults(
  defineProps<
    HoverCardRootProps<Component> & {
      class?: unknown;
    }
  >(),
  { arrow: false, placement: "bottom", offset: 8 },
);

const emit = defineEmits<{
  /** Fired when the card opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element the card appears beside. It becomes the trigger. */
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:open` absent. Without it the declared
 * prop would reach Ark as an explicit `false` and pin the card shut, which would
 * leave `defaultOpen` with nothing to do.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? hoverCardDefaults.size;
  },
});
provide(hoverCardVariantsKey, resolved);
</script>

<template>
  <Ark.Root
    data-slot="hover-card"
    :data-size="resolved.size"
    v-model:open="open"
    @open-change="emit('openChange', $event)"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :disabled="props.disabled"
    :positioning="{ placement: props.placement, offset: { mainAxis: props.offset } }"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>
    <HoverCardContent :portal="props.portal" :class="props.class as string | undefined">
      <HoverCardArrow v-if="props.arrow" />
      <HoverCardTitle v-if="props.title != null">{{ props.title }}</HoverCardTitle>
      <HoverCardDescription v-if="props.description != null">
        {{ props.description }}
      </HoverCardDescription>
      <HoverCardBody v-if="props.body != null">
        <component :is="props.body" />
      </HoverCardBody>
    </HoverCardContent>
  </Ark.Root>
</template>
