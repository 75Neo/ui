<script setup lang="ts">
import { type Component, computed, watch } from "vue";
import { X } from "@lucide/vue";
import { sidebar, sidebarMobileQuery, type SidebarProps, type SidebarState } from "@75neo/themes";
import { useMediaQuery } from "../composables/media";
import { useResolvedTheme } from "../composables/theme";

/**
 * A column beside the page that collapses to a strip or disappears, and slides in over
 * the page where there is no room beside it.
 *
 * @remarks
 * One state serves both viewports and the component moves it across when the viewport
 * crosses `lg`: entering the narrow one remembers where the wide one was and closes the
 * panel, and leaving it puts the remembered value back. Without that, a sidebar that is
 * expanded by design would cover a phone's content the moment the page loaded.
 *
 * The narrow panel is the same DOM as the wide column, moved. It is not a focus trap
 * and does not try to be; see the note on the recipe for why a layout element can
 * afford that and a Dialog cannot.
 */
const props = withDefaults(defineProps<SidebarProps<Component> & { class?: unknown }>(), {
  side: "start",
  variant: "sidebar",
  collapsible: "offcanvas",
  /*
   * Both default on, and a type-based `defineProps` declares them as Boolean props, so
   * Vue casts an absent one to `false`. Left unnamed, the sidebar would refuse to
   * animate and would open over a phone's content with no scrim behind it.
   */
  transition: true,
  overlay: true,
});

const slots = defineSlots<{
  /** The scrolling middle of the column, usually a navigation. */
  default?: () => unknown;
  /** A row along the bottom, usually an account or a theme switch. */
  footer?: () => unknown;
  /** Buttons in the header, beside the close button. */
  actions?: () => unknown;
}>();

/*
 * A boolean model needs both the `undefined` in its type and the default, or Vue casts
 * an unbound one to `false` and the sidebar starts collapsed. Open is the intended
 * starting state, so an unset model reads as expanded.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

const isMobile = useMediaQuery(sidebarMobileQuery);
const collapses = computed(() => props.collapsible !== "none");
const isOpen = computed(() => (collapses.value ? (open.value ?? true) : true));

/* Where the wide viewport left it, so crossing back restores it rather than guessing. */
let wide = true;

watch(isMobile, (mobile) => {
  if (mobile) {
    wide = isOpen.value;
    open.value = false;
  } else {
    open.value = wide;
  }
});

const state = computed<SidebarState>(() => (isOpen.value ? "expanded" : "collapsed"));
const closable = computed(() => collapses.value && (props.close || isMobile.value));
const hasHeader = computed(
  () => props.title != null || props.description != null || !!slots.actions || closable.value,
);

const theme = useResolvedTheme(
  sidebar,
  "sidebar",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <aside
    data-slot="base"
    :data-state="state"
    :data-side="props.side"
    :data-variant="props.variant"
    :class="theme.class.base"
  >
    <!-- Reserves the column the fixed panel beside it occupies. -->
    <div data-slot="gap" :data-state="state" :class="theme.class.gap" />

    <div data-slot="container" :data-state="state" :class="theme.class.container">
      <div data-slot="inner" :class="theme.class.inner">
        <div v-if="hasHeader" data-slot="header" :class="theme.class.header">
          <div
            v-if="props.title != null || props.description != null"
            data-slot="wrapper"
            :class="theme.class.wrapper"
          >
            <p v-if="props.title != null" data-slot="title" :class="theme.class.title">
              {{ props.title }}
            </p>
            <p
              v-if="props.description != null"
              data-slot="description"
              :class="theme.class.description"
            >
              {{ props.description }}
            </p>
          </div>

          <div v-if="$slots.actions || closable" data-slot="actions" :class="theme.class.actions">
            <slot name="actions" />

            <button
              v-if="closable"
              type="button"
              aria-label="Collapse sidebar"
              data-slot="close"
              :class="theme.class.close"
              @click="open = false"
            >
              <component :is="props.closeIcon ?? X" />
            </button>
          </div>
        </div>

        <div data-slot="body" :class="theme.class.body">
          <slot />
        </div>

        <div v-if="$slots.footer" data-slot="footer" :class="theme.class.footer">
          <slot name="footer" />
        </div>
      </div>

      <button
        v-if="props.rail && collapses"
        type="button"
        :tabindex="-1"
        aria-label="Toggle sidebar"
        data-slot="rail"
        :data-state="state"
        :class="theme.class.rail"
        @click="open = !isOpen"
      />
    </div>
  </aside>

  <div
    v-if="props.overlay && collapses && isMobile && isOpen"
    data-slot="overlay"
    :class="theme.class.overlay"
    @click="open = false"
  />
</template>
