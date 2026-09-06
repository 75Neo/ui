<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { Check as CheckIcon, ChevronRight as ChevronRightIcon } from "@lucide/vue";
import { cn, menuDefaults, type MenuRootProps } from "@75neo/themes";
import { menuVariantsKey } from "./variants";
import MenuArrow from "./arrow.vue";
import MenuContent from "./content.vue";
import MenuRows from "./MenuRows.vue";

/**
 * Props for the Menu.
 *
 * @remarks
 * The open state lives outside the shared contract, because React and Vue spell it
 * too differently to share one type. Here it is `v-model:open`.
 *
 * `children` is the trigger, not the rows: the rows are data, and the one element a
 * caller has to own is what opens the menu.
 */
const props = withDefaults(
  defineProps<
    MenuRootProps<Component> & {
      class?: unknown;
    }
  >(),
  /*
   * `portal` defaults to `true`, and it is exactly what Vue's Boolean casting would
   * get wrong: an absent Boolean-typed prop arrives as `false`, so the panel would
   * render in place unless a caller asked for it by name.
   */
  { portal: true, placement: "bottom-start", offset: 8 },
);

const emit = defineEmits<{
  /** Fired when the menu opens or closes. */
  openChange: [details: { open: boolean }];
  /** Fired when a row is chosen, with the row's value. */
  select: [details: { value: string }];
}>();

defineSlots<{
  /** The element that opens the menu. It becomes the trigger and carries Ark's props. */
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:open` absent. Without it the declared
 * prop would reach Ark as an explicit `false` and pin the menu shut, which would leave
 * `defaultOpen` with nothing to do.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? menuDefaults.color;
  },
  get size() {
    return props.size ?? menuDefaults.size;
  },
});
provide(menuVariantsKey, resolved);

const rootClass = computed(() => props.class as string | undefined);
</script>

<template>
  <Ark.Root
    data-slot="menu"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :close-on-select="props.closeOnSelect"
    :loop-focus="props.loopFocus"
    :typeahead="props.typeahead"
    :positioning="{ placement: props.placement, offset: { mainAxis: props.offset } }"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    v-model:open="open"
    @open-change="emit('openChange', $event)"
    @select="emit('select', $event)"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>
    <MenuContent :portal="props.portal" :class="rootClass">
      <MenuArrow v-if="props.arrow" />
      <MenuRows
        :rows="props.items"
        :glyphs="{
          trailingIcon: props.trailingIcon ?? ChevronRightIcon,
          checkedIcon: props.checkedIcon ?? CheckIcon,
        }"
        :portal="props.portal"
        :transition="true"
      />
    </MenuContent>
  </Ark.Root>
</template>
