<script setup lang="ts">
import { type Component, computed, onMounted, ref } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { X } from "@lucide/vue";
import { type PopoverProps, popover } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:open`, with
 * `defaultOpen` as the uncontrolled counterpart Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    PopoverProps<Component> & {
      class?: unknown;
      defaultOpen?: boolean;
      ids?: {
        anchor?: string;
        trigger?: string;
        content?: string;
        title?: string;
        description?: string;
        closeTrigger?: string;
        positioner?: string;
        arrow?: string;
      };
    }
  >(),
  /*
   * `dismissible` and `portal` default on, and a type-based `defineProps` declares them
   * as Boolean props, so Vue casts an absent one to `false`: Escape would go dead and
   * the panel would stay inside whatever overflow the trigger sits in. `placement` and
   * `offset` are named here because they are read below rather than handed to Ark, so
   * Ark's own defaults never see them. This is the cast that once unticked every
   * `defaultChecked` Checkbox.
   */
  { dismissible: true, portal: true, placement: "bottom", offset: 8 },
);

const emit = defineEmits<{
  /** Fired whenever the popover opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element that opens the popover. It becomes the trigger and carries Ark's props. */
  default?: () => unknown;
  /** Overrides the `title` prop. */
  title?: () => unknown;
  /** Overrides the `description` prop. */
  description?: () => unknown;
  /** The panel's main content, under the title and description. */
  body?: () => unknown;
}>();

const open = defineModel<boolean | undefined>("open", { default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the panel is left in place until the component is mounted —
 * otherwise the first client render disagrees with the server's and the page logs a
 * hydration mismatch. Dialog, Tooltip, Combobox and DatePicker do the same.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const positioning = computed(() => ({
  placement: props.placement,
  offset: { mainAxis: props.offset },
}));

/*
 * Ark spells the two halves of dismissal separately, and a caller is thinking about
 * both at once. Left `undefined` rather than `true` when it is on, so Ark's own
 * defaults stand.
 */
const dismiss = () => (props.dismissible ? undefined : false);

const theme = useResolvedTheme(
  popover,
  "popover",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :close-on-escape="dismiss()"
    :close-on-interact-outside="dismiss()"
    :modal="props.modal"
    :auto-focus="props.autoFocus"
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

          <Ark.Title
            v-if="props.title != null || $slots.title"
            data-slot="title"
            :class="theme.class.title"
          >
            <slot name="title">{{ props.title }}</slot>
          </Ark.Title>

          <Ark.Description
            v-if="props.description != null || $slots.description"
            data-slot="description"
            :class="theme.class.description"
          >
            <slot name="description">{{ props.description }}</slot>
          </Ark.Description>

          <div v-if="$slots.body" data-slot="body" :class="theme.class.body">
            <slot name="body" />
          </div>

          <Ark.CloseTrigger
            v-if="props.close"
            data-slot="closeTrigger"
            :class="theme.class.closeTrigger"
          >
            <component :is="props.closeIcon ?? X" />
          </Ark.CloseTrigger>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
