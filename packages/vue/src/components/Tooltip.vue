<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { type TooltipProps, tooltip } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:open`, with
 * `defaultOpen` as the uncontrolled counterpart Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    TooltipProps & {
      class?: unknown;
      defaultOpen?: boolean;
      ids?: { trigger?: string; content?: string; arrow?: string; positioner?: string };
    }
  >(),
  /*
   * `portal` defaults on, and a type-based `defineProps` declares it as a Boolean prop,
   * so Vue casts an absent one to `false` and the bubble would stay inside whatever
   * overflow the trigger sits in. The numbers are named here for the same reason a
   * default belongs in one place: `placement` and `offset` are read below rather than
   * handed to Ark, so Ark's own defaults never see them.
   */
  { placement: "top", offset: 8, portal: true },
);

const emit = defineEmits<{
  /** Fired whenever the bubble opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element the tooltip explains. It becomes the trigger and carries Ark's props. */
  default?: () => unknown;
  /** The bubble's content, for when a string is not enough. Falls back to `text`. */
  content?: () => unknown;
}>();

const open = defineModel<boolean | undefined>("open", { default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the bubble is left in place until the component is mounted —
 * otherwise the first client render disagrees with the server's and the page logs a
 * hydration mismatch. Dialog, Combobox and DatePicker do the same.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const positioning = computed(() => ({
  placement: props.placement,
  offset: { mainAxis: props.offset },
}));

const theme = useResolvedTheme(
  tooltip,
  "tooltip",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :interactive="props.interactive"
    :disabled="props.disabled"
    :positioning="positioning"
    :default-open="props.defaultOpen"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :ids="props.ids"
    @open-change="emit('openChange', $event)"
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
          <slot name="content">{{ props.text }}</slot>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
