<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { X as XIcon } from "@lucide/vue";
import { cn, dialogDefaults, type DialogRootProps } from "@75neo/themes";
import { dialogVariantsKey } from "./variants";
import DialogBackdrop from "./backdrop.vue";
import DialogBody from "./body.vue";
import DialogCloseTrigger from "./close-trigger.vue";
import DialogContent from "./content.vue";
import DialogDescription from "./description.vue";
import DialogFooter from "./footer.vue";
import DialogHeader from "./header.vue";
import DialogTitle from "./title.vue";

const props = defineProps<
  DialogRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the dialog opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element that opens the dialog. It becomes the trigger. */
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:open` absent. Without it the declared
 * prop would reach Ark as an explicit `false` and pin the dialog shut, which would
 * leave `defaultOpen` with nothing to do.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? dialogDefaults.size;
  },
});
provide(dialogVariantsKey, resolved);

/*
 * Ark spells the two halves of dismissal separately, and a caller thinking about a
 * confirmation dialog is thinking about both at once, so one prop drives both. Left
 * `undefined` rather than `true` when it is on, so Ark's own defaults stand.
 */
const dismiss = computed(() => ((props.dismissible ?? true) ? undefined : false));
</script>

<template>
  <Ark.Root
    data-slot="dialog"
    :data-size="resolved.size"
    :open="open"
    @open-change="emit('openChange', $event)"
    :close-on-escape="dismiss"
    :close-on-interact-outside="dismiss"
    :modal="props.modal"
    :role="props.role"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>
    <DialogBackdrop v-if="props.overlay ?? true" :transition="props.transition" />
    <DialogContent
      :portal="props.portal"
      :transition="props.transition"
      :fullscreen="props.fullscreen"
      :class="props.class as string | undefined"
    >
      <component :is="props.header" v-if="props.header !== undefined" />
      <template v-else>
        <DialogHeader>
          <span data-slot="dialog-wrapper" :class="cn('flex min-w-0 flex-1 flex-col gap-1')">
            <DialogTitle v-if="props.title != null">{{ props.title }}</DialogTitle>
            <DialogDescription v-if="props.description != null">
              {{ props.description }}
            </DialogDescription>
          </span>
          <DialogCloseTrigger v-if="props.close ?? true" aria-label="Close dialog">
            <component :is="props.closeIcon ?? XIcon" />
          </DialogCloseTrigger>
        </DialogHeader>
        <DialogBody v-if="props.body != null">
          <component :is="props.body" />
        </DialogBody>
        <DialogFooter v-if="props.footer != null">
          <component :is="props.footer" />
        </DialogFooter>
      </template>
    </DialogContent>
  </Ark.Root>
</template>
