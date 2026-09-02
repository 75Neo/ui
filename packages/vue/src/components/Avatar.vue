<script setup lang="ts">
import { type Component, computed } from "vue";
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
  /** Replace the fallback. Falls back to the initials in `content`. */
  fallback?: (props: { content: string | undefined }) => unknown;
  /**
   * Render a custom image element in place of the default one, for `NuxtImg` or
   * anything else that has to merge Ark's own image props. Bind `props`, `class` and
   * `data-slot="image"`, and honour `hidden` with `visibility` if your element drops
   * the attribute.
   */
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

/** A non-string fallback is a component, and renders instead of any text. */
const fallbackIsComponent = computed(
  () => props.fallback != null && typeof props.fallback !== "string",
);

/**
 * Text for the fallback. An explicit string wins outright, a name gives its initials,
 * and anything else leaves the fallback empty.
 */
const fallbackText = computed(() => {
  if (typeof props.fallback === "string") return props.fallback;
  if (props.fallback != null) return undefined;
  return (props.name ? getAvatarInitials(props.name) : "") || undefined;
});

/**
 * Ark's own image props, split the way the `image` slot takes them. `hidden` comes out
 * on its own because Ark hides the image until it loads and some components drop the
 * attribute, so a custom image honours it with `visibility` instead.
 */
function imageDetails(api: { getImageProps: () => object }) {
  const { hidden, ...rest } = api.getImageProps() as Record<string, unknown>;
  return { hidden: Boolean(hidden), props: rest };
}
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :ids="props.ids"
    @status-change="props.onStatusChange"
  >
    <Ark.Fallback data-slot="fallback" :class="theme.class.fallback">
      <slot name="fallback" :content="fallbackText">
        <component :is="props.fallback" v-if="fallbackIsComponent" />
        <template v-else>{{ fallbackText }}</template>
      </slot>
    </Ark.Fallback>

    <template v-if="props.src">
      <Ark.Context v-slot="api">
        <slot
          name="image"
          :src="props.src"
          :alt="props.alt ?? ''"
          :class="theme.class.image"
          v-bind="imageDetails(api)"
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
