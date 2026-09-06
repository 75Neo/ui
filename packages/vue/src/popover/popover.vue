<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { X as XIcon } from "@lucide/vue";
import { popoverDefaults, type PopoverRootProps } from "@75neo/themes";
import { popoverVariantsKey } from "./variants";
import PopoverArrow from "./arrow.vue";
import PopoverBody from "./body.vue";
import PopoverCloseTrigger from "./close-trigger.vue";
import PopoverContent from "./content.vue";
import PopoverDescription from "./description.vue";
import PopoverTitle from "./title.vue";

const props = withDefaults(
  defineProps<
    PopoverRootProps<Component> & {
      class?: unknown;
    }
  >(),
  { arrow: false, placement: "bottom", offset: 8, close: false },
);

const emit = defineEmits<{
  /** Fired when the popover opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element that opens the popover. It becomes the trigger. */
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:open` absent. Without it the declared
 * prop would reach Ark as an explicit `false` and pin the popover shut, which would
 * leave `defaultOpen` with nothing to do.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? popoverDefaults.size;
  },
  get close() {
    return props.close;
  },
});
provide(popoverVariantsKey, resolved);

/*
 * Ark spells the two halves of dismissal separately, and a caller is thinking
 * about dismissal as one thing. Left `undefined` rather than `true` when it is
 * on, so Ark's own defaults stand.
 */
const dismiss = computed(() => ((props.dismissible ?? true) ? undefined : false));
</script>

<template>
  <Ark.Root
    data-slot="popover"
    :data-size="resolved.size"
    v-model:open="open"
    @open-change="emit('openChange', $event)"
    :close-on-escape="dismiss"
    :close-on-interact-outside="dismiss"
    :modal="props.modal"
    :auto-focus="props.autoFocus"
    :positioning="{ placement: props.placement, offset: { mainAxis: props.offset } }"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>
    <PopoverContent :portal="props.portal" :class="props.class as string | undefined">
      <PopoverArrow v-if="props.arrow" />
      <PopoverTitle v-if="props.title != null">{{ props.title }}</PopoverTitle>
      <PopoverDescription v-if="props.description != null">
        {{ props.description }}
      </PopoverDescription>
      <PopoverBody v-if="props.body != null">
        <component :is="props.body" />
      </PopoverBody>
      <PopoverCloseTrigger v-if="props.close" aria-label="Close popover">
        <component :is="props.closeIcon ?? XIcon" />
      </PopoverCloseTrigger>
    </PopoverContent>
  </Ark.Root>
</template>
