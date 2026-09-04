<script setup lang="ts">
import { type Component, computed, onMounted, ref } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { Check, ChevronRight } from "@lucide/vue";
import { menu, type MenuProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";
import MenuRows from "./MenuRows.vue";

/**
 * The open state lives outside the shared contract, because React and Vue spell it too
 * differently to share one type. Here it is `v-model:open`.
 *
 * The trigger is the default slot, handed to Ark with `as-child`, and the rows are the
 * `items` prop. That is the rule for every component carrying the caller's own content,
 * and the Dialog is where it was settled.
 */
const props = withDefaults(
  defineProps<
    MenuProps<Component> & {
      defaultOpen?: boolean;
      class?: unknown;
    }
  >(),
  /*
   * `portal` and `transition` default to `true`, and both are exactly what Vue's Boolean
   * casting would get wrong: an absent Boolean-typed prop arrives as `false`, so the
   * panel would render in place and never animate unless a caller asked for each by
   * name. `arrow` defaults to off, which is what the cast produces anyway.
   */
  { portal: true, transition: true, placement: "bottom-start", offset: 8 },
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

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the panel is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const theme = useResolvedTheme(
  menu,
  "menu",
  () => props,
  () => props.class as string | undefined,
);

const positioning = computed(() => ({
  placement: props.placement,
  offset: { mainAxis: props.offset },
}));
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :close-on-select="props.closeOnSelect"
    :loop-focus="props.loopFocus"
    :typeahead="props.typeahead"
    :positioning="positioning"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    @open-change="emit('openChange', $event)"
    @select="emit('select', $event)"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>

    <Teleport to="body" :disabled="!props.portal || !mounted">
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="base" :class="theme.class.base">
          <Ark.Arrow v-if="props.arrow" data-slot="arrow" :class="theme.class.arrow">
            <Ark.ArrowTip data-slot="arrowTip" :class="theme.class.arrowTip" />
          </Ark.Arrow>
          <MenuRows
            :items="props.items"
            :theme="theme"
            :trailing-icon="props.trailingIcon ?? ChevronRight"
            :checked-icon="props.checkedIcon ?? Check"
            :portal="props.portal && mounted"
          />
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
