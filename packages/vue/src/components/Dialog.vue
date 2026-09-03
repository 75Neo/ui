<script setup lang="ts">
import { type Component, onMounted, ref } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { X } from "@lucide/vue";
import { type DialogProps, dialog } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:open`, with
 * `defaultOpen` as the uncontrolled counterpart Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    DialogProps<Component> & {
      class?: unknown;
      defaultOpen?: boolean;
      ids?: {
        trigger?: string;
        positioner?: string;
        backdrop?: string;
        content?: string;
        closeTrigger?: string;
        title?: string;
        description?: string;
      };
    }
  >(),
  /*
   * Every one of these defaults on, and a type-based `defineProps` declares them as
   * Boolean props, so Vue casts an absent one to `false`. Left unnamed, `overlay` and
   * `close` would render nothing and `dismissible` would reach Ark as an explicit
   * `false` — beating its own default and leaving Escape dead in Vue while React worked.
   * This is the same cast that once unticked every `defaultChecked` Checkbox and hid
   * ColorPicker's hex field.
   */
  { overlay: true, dismissible: true, close: true, portal: true },
);

const emit = defineEmits<{
  /** Fired whenever the dialog opens or closes. */
  openChange: [details: { open: boolean }];
  /** Fired once the closing animation has finished. */
  exitComplete: [];
}>();

defineSlots<{
  /** The element that opens the dialog. It becomes the trigger and carries Ark's props. */
  default?: () => unknown;
  /** Replaces the whole header, including the title, description and close button. */
  header?: () => unknown;
  /** Overrides the `title` prop. */
  title?: () => unknown;
  /** Overrides the `description` prop. */
  description?: () => unknown;
  /** The panel's main content. */
  body?: () => unknown;
  /** The row along the bottom of the panel, usually buttons. */
  footer?: () => unknown;
}>();

const open = defineModel<boolean | undefined>("open", { default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the panel is left in place until the component is mounted — otherwise
 * the first client render disagrees with the server's and the page logs a hydration
 * mismatch. Combobox and DatePicker do the same.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

/*
 * Ark spells the two halves of dismissal separately, and a caller thinking about a
 * confirmation dialog is thinking about both at once, so one prop drives both. Left
 * `undefined` rather than `true` when it is on, so Ark's own defaults stand.
 */
const dismiss = () => (props.dismissible ? undefined : false);

const theme = useResolvedTheme(
  dialog,
  "dialog",
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
    :role="props.role"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :ids="props.ids"
    @open-change="emit('openChange', $event)"
    @exit-complete="emit('exitComplete')"
  >
    <!--
      The caller's own element becomes the trigger, so it can be a themed Button
      carrying Ark's props rather than something this component wraps in one.
    -->
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>

    <Teleport to="body" :disabled="!props.portal || !mounted">
      <Ark.Backdrop v-if="props.overlay" data-slot="overlay" :class="theme.class.overlay" />
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="base" :class="theme.class.base">
          <slot name="header">
            <header data-slot="header" :class="theme.class.header">
              <div data-slot="wrapper" :class="theme.class.wrapper">
                <Ark.Title
                  v-if="props.title || $slots.title"
                  data-slot="title"
                  :class="theme.class.title"
                >
                  <slot name="title">{{ props.title }}</slot>
                </Ark.Title>
                <Ark.Description
                  v-if="props.description || $slots.description"
                  data-slot="description"
                  :class="theme.class.description"
                >
                  <slot name="description">{{ props.description }}</slot>
                </Ark.Description>
              </div>

              <Ark.CloseTrigger
                v-if="props.close"
                aria-label="Close dialog"
                data-slot="closeTrigger"
                :class="theme.class.closeTrigger"
              >
                <component :is="props.closeIcon ?? X" />
              </Ark.CloseTrigger>
            </header>
          </slot>

          <div v-if="$slots.body" data-slot="body" :class="theme.class.body">
            <slot name="body" />
          </div>

          <footer v-if="$slots.footer" data-slot="footer" :class="theme.class.footer">
            <slot name="footer" />
          </footer>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
