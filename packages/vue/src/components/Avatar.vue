<script setup lang="ts">
import { computed } from "vue";
import {
  AvatarRoot as ArkRoot,
  AvatarFallback as ArkFallback,
  AvatarImage as ArkImage,
} from "@ark-ui/vue/avatar";
import { avatar, type AvatarVariants } from "@75neo/styles";
import { avatarKey, resolveAvatarFallback, type AvatarUI } from "@75neo/core";
import { useComponentUI } from "../composables/useComponentUI";

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    /** Fallback text; when omitted, initials are derived from `alt`. */
    text?: string;
    size?: AvatarVariants["size"];
    color?: AvatarVariants["color"];
    shape?: AvatarVariants["shape"];
    ui?: AvatarUI;
    class?: unknown;
    ids?: { root?: string; image?: string; fallback?: string };
  }>(),
  {
    src: undefined,
    alt: undefined,
    text: undefined,
    size: undefined,
    color: undefined,
    shape: undefined,
    ui: undefined,
    class: undefined,
    ids: undefined,
  },
);

const emit = defineEmits<{
  statusChange: [details: { status: "loading" | "loaded" | "error" }];
}>();

const slots = defineSlots<{
  /** Takes precedence over the fallback text. */
  icon?: () => unknown;
  /** Falls back to the resolved initials. */
  fallback?: (bag: { initials: string }) => unknown;
}>();

const initials = computed(() => resolveAvatarFallback(props.text, props.alt));

const tvSlots = computed(() =>
  avatar({ size: props.size, color: props.color, shape: props.shape }),
);

const resolved = useComponentUI(
  avatarKey,
  tvSlots,
  computed(() => props.ui),
);
</script>

<template>
  <ArkRoot
    data-slot="root"
    :ids="ids"
    :class="resolved.root({ class: props.class as string })"
    @status-change="emit('statusChange', $event)"
  >
    <ArkImage v-if="src" data-slot="image" :src="src" :alt="alt ?? ''" :class="resolved.image()" />
    <ArkFallback data-slot="fallback" :class="resolved.fallback()">
      <span v-if="slots.icon" data-slot="icon" :class="resolved.icon()">
        <slot name="icon" />
      </span>
      <slot v-else name="fallback" :initials="initials">{{ initials }}</slot>
    </ArkFallback>
  </ArkRoot>
</template>
