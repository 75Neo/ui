<script setup lang="ts">
import type { Component } from "vue";
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { type AvatarProps, avatar, getAvatarInitials } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = defineProps<
  AvatarProps<Component> & {
    class?: unknown;
    ids?: { root?: string; image?: string; fallback?: string };
    onStatusChange?: (details: { status: "loading" | "loaded" | "error" }) => void;
  }
>();

defineSlots<{
  fallback?: (props: { content: string | undefined }) => unknown;
  image?: (props: {
    src: string;
    alt: string;
    class: string;
    hidden: boolean;
    props: Record<string, unknown>;
  }) => unknown;
}>();

const theme = useResolvedTheme(
  avatar,
  "avatar",
  () => props,
  () => props.class as string | undefined,
);

const fallbackIsComponent = () => props.fallback != null && typeof props.fallback !== "string";

function fallbackContent(): string | undefined {
  if (props.fallback !== undefined && typeof props.fallback === "string") return props.fallback;
  if (typeof props.fallback !== "string" && props.fallback != null) return undefined;
  if (props.name) {
    const initials = getAvatarInitials(props.name);
    if (initials) return initials;
  }
  return undefined;
}

function handleStatusChange(details: { status: "loading" | "loaded" | "error" }) {
  props.onStatusChange?.(details);
}
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :ids="props.ids"
    @status-change="handleStatusChange"
  >
    <Ark.Fallback data-slot="fallback" :class="theme.class.fallback">
      <slot name="fallback" :content="fallbackContent()">
        <component :is="props.fallback" v-if="fallbackIsComponent()" />
        <template v-else>{{ fallbackContent() }}</template>
      </slot>
    </Ark.Fallback>

    <template v-if="props.src">
      <Ark.Context v-slot="api">
        <slot
          name="image"
          :src="props.src"
          :alt="props.alt ?? ''"
          :class="theme.class.image"
          :hidden="Boolean((api.getImageProps() as unknown as Record<string, unknown>).hidden)"
          :props="
            (({ hidden: _hidden, ...rest }) => rest)(
              api.getImageProps() as unknown as Record<string, unknown>,
            )
          "
        >
          <Ark.Image
            data-slot="image"
            :class="theme.class.image"
            :src="props.src"
            :alt="props.alt ?? ''"
          />
        </slot>
      </Ark.Context>
    </template>
  </Ark.Root>
</template>
