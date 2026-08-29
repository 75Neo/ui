<script lang="ts">
export type AvatarUI = {
  root?: string | ((cls: string) => string);
  image?: string | ((cls: string) => string);
  fallback?: string | ((cls: string) => string);
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  AvatarRoot as ArkRoot,
  AvatarFallback as ArkFallback,
  AvatarImage as ArkImage,
} from "@ark-ui/vue/avatar";
import { avatar, type AvatarVariants, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../composables/useComponentUI";

const props = withDefaults(
  defineProps<{
    size?: AvatarVariants["size"];
    shape?: AvatarVariants["shape"];
    src?: string;
    alt?: string;
    name?: string;
    fallback?: string;
    ui?: AvatarUI;
    ids?: {
      root?: string;
      image?: string;
      fallback?: string;
    };
  }>(),
  {
    size: undefined,
    shape: undefined,
    src: undefined,
    alt: undefined,
    name: undefined,
    fallback: undefined,
    ui: undefined,
    ids: undefined,
  },
);

const emit = defineEmits<{
  statusChange: [details: { status: "loading" | "loaded" | "error" }];
}>();

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const fallbackContent = computed(() => {
  if (props.fallback !== undefined) return props.fallback;
  if (props.name) return getInitials(props.name);
  return "";
});

const tvSlots = computed(() =>
  avatar({
    size: props.size,
    shape: props.shape,
  }),
);

const resolved = useComponentUI(
  "avatar",
  tvSlots,
  computed(() => props.ui as Record<string, SlotClass> | undefined),
);

function onStatusChange(details: { status: "loading" | "loaded" | "error" }) {
  emit("statusChange", details);
}
</script>

<template>
  <ArkRoot data-slot="root" :ids="ids" :class="resolved.root()" @status-change="onStatusChange">
    <slot>
      <ArkFallback data-slot="fallback" :class="resolved.fallback()">
        <slot name="fallback">{{ fallbackContent }}</slot>
      </ArkFallback>
      <ArkImage
        v-if="src"
        data-slot="image"
        :src="src"
        :alt="alt ?? ''"
        :class="resolved.image()"
      />
    </slot>
  </ArkRoot>
</template>
