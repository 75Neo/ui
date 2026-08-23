<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory";
import { LoaderCircleIcon } from "@lucide/vue";
import { computed, useSlots } from "vue";
import { useComponentTheme } from "../theme";
import { useSplitAttrs } from "../utils";
import { buttonProps } from "./props";

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` theme.
 *
 * A label, an icon on either side, a loading state that replaces whichever icon is
 * showing, and `square` inferred when there is nothing but an icon.
 */
defineOptions({ name: "NeoButton", inheritAttrs: false });

const props = defineProps(buttonProps);
const slots = useSlots();

const { attrsClass, otherAttrs } = useSplitAttrs();
const theme = useComponentTheme("button");

// The factory caches per tag, so this is the same component object for every instance.
const ArkButton = ark.button;

/*
 * Which side each icon lands on: a bare `icon` leads unless `trailing` says otherwise,
 * `leadingIcon`/`trailingIcon` are absolute, and the spinner takes over whichever side
 * is already occupied.
 */
const isLeading = computed(() =>
  Boolean(
    (props.icon && props.leading) ||
    (props.icon && !props.trailing) ||
    (props.loading && !props.trailing) ||
    props.leadingIcon,
  ),
);

const isTrailing = computed(() =>
  Boolean(
    (props.icon && props.trailing) ||
    (props.loading && props.trailing) ||
    (props.trailingIcon && props.trailing !== false),
  ),
);

const leadingIcon = computed(() =>
  props.loading ? (props.loadingIcon ?? LoaderCircleIcon) : (props.leadingIcon ?? props.icon),
);

const trailingIcon = computed(() =>
  props.loading && !isLeading.value
    ? (props.loadingIcon ?? LoaderCircleIcon)
    : (props.trailingIcon ?? props.icon),
);

const ui = computed(() =>
  theme.value({
    color: props.color,
    variant: props.variant,
    size: props.size,
    block: props.block,
    loading: props.loading,
    leading: isLeading.value,
    trailing: isTrailing.value,
    // An icon on its own gets equal padding, so the caller does not have to say so.
    square: props.square ?? (!slots.default && props.label === undefined),
  }),
);
</script>

<template>
  <ArkButton
    v-bind="otherAttrs"
    :class="ui.base({ class: [props.ui?.base, attrsClass] })"
    :disabled="props.disabled ?? props.loading"
  >
    <component
      :is="leadingIcon"
      v-if="isLeading && leadingIcon"
      :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
      aria-hidden="true"
      focusable="false"
    />

    <slot>
      <span v-if="props.label !== undefined" :class="ui.label({ class: props.ui?.label })">
        {{ props.label }}
      </span>
    </slot>

    <component
      :is="trailingIcon"
      v-if="isTrailing && trailingIcon"
      :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
      aria-hidden="true"
      focusable="false"
    />
  </ArkButton>
</template>
