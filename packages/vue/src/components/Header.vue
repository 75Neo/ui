<script setup lang="ts">
import { type Component, onMounted, ref } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { Menu, X } from "@lucide/vue";
import { header, type HeaderProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The bar across the top of a page, and the menu it opens where there is no room for a
 * navigation.
 *
 * @remarks
 * The wordmark and the actions are rendered twice, once in the bar and once at the top
 * of the menu, so the menu opens over the page without the page appearing to lose its
 * header. The two rows are written out rather than shared, because a reusable template
 * would mean a dependency on VueUse for markup this short.
 *
 * The toggle is a plain `button` driving the model rather than one of Ark's triggers: a
 * trigger inside a modal panel is inert, and the same button has to work in both rows.
 */
const props = withDefaults(defineProps<HeaderProps<Component> & { class?: unknown }>(), {
  /*
   * Both default on, and a type-based `defineProps` declares them as Boolean props, so
   * Vue casts an absent one to `false`. Left unnamed, the Header would render no toggle
   * and no scrim while React rendered both.
   */
  toggle: true,
  overlay: true,
  portal: true,
  toggleSide: "end",
});

defineSlots<{
  /** The middle of the bar, usually the primary navigation. Hidden below `lg`. */
  default?: () => unknown;
  /** Replaces the wordmark at the start of the bar. */
  left?: () => unknown;
  /** The end of the bar, usually actions. */
  right?: () => unknown;
  /** What the menu holds. Without it there is nothing to open and no toggle. */
  body?: () => unknown;
}>();

const open = defineModel<boolean | undefined>("open", { default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the menu is left in place until the component is mounted — otherwise
 * the first client render disagrees with the server's and the page logs a hydration
 * mismatch. Dialog, Combobox and DatePicker do the same.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const theme = useResolvedTheme(
  header,
  "header",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root :open="open ?? false" lazy-mount @open-change="open = $event.open">
    <header data-slot="base" :class="theme.class.base">
      <div data-slot="container" :class="theme.class.container">
        <div data-slot="left" :class="theme.class.left">
          <button
            v-if="props.toggle && $slots.body && props.toggleSide === 'start'"
            type="button"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            :aria-expanded="open ?? false"
            data-slot="toggle"
            :class="theme.class.toggle"
            @click="open = !open"
          >
            <component :is="open ? (props.toggleCloseIcon ?? X) : (props.toggleIcon ?? Menu)" />
          </button>

          <slot name="left">
            <a
              v-if="props.title != null && props.to != null"
              :href="props.to"
              data-slot="title"
              :class="theme.class.title"
            >
              {{ props.title }}
            </a>
            <span v-else-if="props.title != null" data-slot="title" :class="theme.class.title">
              {{ props.title }}
            </span>
          </slot>
        </div>

        <div data-slot="center" :class="theme.class.center">
          <slot />
        </div>

        <div data-slot="right" :class="theme.class.right">
          <slot name="right" />

          <button
            v-if="props.toggle && $slots.body && props.toggleSide === 'end'"
            type="button"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            :aria-expanded="open ?? false"
            data-slot="toggle"
            :class="theme.class.toggle"
            @click="open = !open"
          >
            <component :is="open ? (props.toggleCloseIcon ?? X) : (props.toggleIcon ?? Menu)" />
          </button>
        </div>
      </div>
    </header>

    <Teleport v-if="props.toggle && $slots.body" to="body" :disabled="!props.portal || !mounted">
      <Ark.Backdrop v-if="props.overlay" data-slot="overlay" :class="theme.class.overlay" />
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="menu" :class="theme.class.menu">
          <Ark.Title data-slot="menuTitle" :class="theme.class.menuTitle">
            {{ props.title ?? "Menu" }}
          </Ark.Title>

          <div data-slot="menuHeader" :class="theme.class.menuHeader">
            <div data-slot="left" :class="theme.class.left">
              <button
                v-if="props.toggleSide === 'start'"
                type="button"
                :aria-label="open ? 'Close menu' : 'Open menu'"
                :aria-expanded="open ?? false"
                data-slot="toggle"
                :class="theme.class.toggle"
                @click="open = !open"
              >
                <component :is="open ? (props.toggleCloseIcon ?? X) : (props.toggleIcon ?? Menu)" />
              </button>

              <slot name="left">
                <a
                  v-if="props.title != null && props.to != null"
                  :href="props.to"
                  data-slot="title"
                  :class="theme.class.title"
                >
                  {{ props.title }}
                </a>
                <span v-else-if="props.title != null" data-slot="title" :class="theme.class.title">
                  {{ props.title }}
                </span>
              </slot>
            </div>

            <div data-slot="right" :class="theme.class.right">
              <slot name="right" />

              <button
                v-if="props.toggleSide === 'end'"
                type="button"
                :aria-label="open ? 'Close menu' : 'Open menu'"
                :aria-expanded="open ?? false"
                data-slot="toggle"
                :class="theme.class.toggle"
                @click="open = !open"
              >
                <component :is="open ? (props.toggleCloseIcon ?? X) : (props.toggleIcon ?? Menu)" />
              </button>
            </div>
          </div>

          <div data-slot="menuBody" :class="theme.class.menuBody">
            <slot name="body" />
          </div>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
