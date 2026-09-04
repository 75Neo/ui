<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { hoverCard, type HoverCardProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:open`, with
 * `defaultOpen` as the uncontrolled counterpart Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    HoverCardProps & {
      class?: unknown;
      defaultOpen?: boolean;
      ids?: {
        trigger?: string;
        content?: string;
        positioner?: string;
        arrow?: string;
      };
    }
  >(),
  /*
   * `portal` defaults on, and a type-based `defineProps` declares it as a Boolean
   * prop, so Vue casts an absent one to `false` and the card would stay inside
   * whatever overflow the trigger sits in. `placement` and `offset` are named here
   * because they are read below rather than handed to Ark, so Ark's own defaults
   * never see them.
   */
  { placement: "bottom", offset: 8, portal: true },
);

const emit = defineEmits<{
  /** Fired whenever the card opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element the card appears for. It becomes the trigger and carries Ark's props. */
  default?: () => unknown;
  /** Overrides the `title` prop. */
  title?: () => unknown;
  /** Overrides the `description` prop. */
  description?: () => unknown;
  /** The card's main content, under the title and description. */
  body?: () => unknown;
}>();

const open = defineModel<boolean | undefined>("open", { default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the card is left in place until the component is mounted —
 * otherwise the first client render disagrees with the server's and the page logs a
 * hydration mismatch. Dialog, Popover and Tooltip do the same.
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
  hoverCard,
  "hoverCard",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :disabled="props.disabled"
    :positioning="positioning"
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

          <div
            v-if="props.title != null || $slots.title"
            data-slot="title"
            :class="theme.class.title"
          >
            <slot name="title">{{ props.title }}</slot>
          </div>

          <div
            v-if="props.description != null || $slots.description"
            data-slot="description"
            :class="theme.class.description"
          >
            <slot name="description">{{ props.description }}</slot>
          </div>

          <div v-if="$slots.body" data-slot="body" :class="theme.class.body">
            <slot name="body" />
          </div>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
