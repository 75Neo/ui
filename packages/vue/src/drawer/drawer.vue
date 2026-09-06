<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { X as XIcon } from "@lucide/vue";
import { cn, drawerDefaults, type DrawerRootProps } from "@75neo/themes";
import { drawerVariantsKey } from "./variants";
import DrawerBackdrop from "./backdrop.vue";
import DrawerBody from "./body.vue";
import DrawerCloseTrigger from "./close-trigger.vue";
import DrawerContent from "./content.vue";
import DrawerDescription from "./description.vue";
import DrawerFooter from "./footer.vue";
import DrawerHeader from "./header.vue";
import DrawerTitle from "./title.vue";

const props = defineProps<
  DrawerRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the drawer opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element that opens the drawer. It becomes the trigger. */
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:open` absent. Without it the declared
 * prop would reach Ark as an explicit `false` and pin the drawer shut, which would
 * leave `defaultOpen` with nothing to do.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get placement() {
    return props.placement ?? drawerDefaults.placement;
  },
  get size() {
    return props.size ?? drawerDefaults.size;
  },
});
provide(drawerVariantsKey, resolved);

/*
 * Ark spells the two halves of dismissal separately, and a caller thinking about a
 * confirmation drawer is thinking about both at once, so one prop drives both. Left
 * `undefined` rather than `true` when it is on, so Ark's own defaults stand.
 */
const dismiss = computed(() => ((props.dismissible ?? true) ? undefined : false));
</script>

<template>
  <Ark.Root
    data-slot="drawer"
    :data-placement="resolved.placement"
    :data-size="resolved.size"
    v-model:open="open"
    @open-change="emit('openChange', $event)"
    :close-on-escape="dismiss"
    :close-on-interact-outside="dismiss"
    :modal="props.modal"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>
    <DrawerBackdrop v-if="props.overlay ?? true" :transition="props.transition" />
    <DrawerContent
      :portal="props.portal"
      :draggable="props.draggable"
      :transition="props.transition"
      :class="props.class as string | undefined"
    >
      <template v-if="props.header !== undefined">
        <component :is="props.header" />
      </template>
      <template v-else>
        <DrawerHeader>
          <span data-slot="drawer-wrapper" :class="cn('flex min-w-0 flex-1 flex-col gap-1')">
            <DrawerTitle v-if="props.title != null">{{ props.title }}</DrawerTitle>
            <DrawerDescription v-if="props.description != null">
              {{ props.description }}
            </DrawerDescription>
          </span>
          <DrawerCloseTrigger v-if="props.close ?? true" aria-label="Close drawer">
            <component :is="props.closeIcon ?? XIcon" />
          </DrawerCloseTrigger>
        </DrawerHeader>
        <DrawerBody v-if="props.body != null">
          <component :is="props.body" />
        </DrawerBody>
        <DrawerFooter v-if="props.footer != null">
          <component :is="props.footer" />
        </DrawerFooter>
      </template>
    </DrawerContent>
  </Ark.Root>
</template>
