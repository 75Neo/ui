<script setup lang="ts">
import { type Component, computed, provide, reactive, watch } from "vue";
import { cva } from "class-variance-authority";
import {
  cn,
  sidebarClasses,
  sidebarCollapsibleData,
  sidebarDefaults,
  sidebarGapCompoundData,
  sidebarMobileQuery,
  sidebarPanelCompoundData,
  sidebarSideData,
  sidebarVariantData,
  type SidebarRootProps,
  type SidebarState,
} from "@75neo/themes";
import { useMediaQuery } from "./use-media-query";
import { sidebarVariantsKey } from "./variants";
import SidebarActions from "./actions.vue";
import SidebarBody from "./body.vue";
import SidebarCloseTrigger from "./close-trigger.vue";
import SidebarDescription from "./description.vue";
import SidebarFooter from "./footer.vue";
import SidebarHeader from "./header.vue";
import SidebarRail from "./rail.vue";
import SidebarTitle from "./title.vue";

const sidebarRoot = cva(sidebarClasses.root, {
  variants: { collapsible: sidebarCollapsibleData.root },
  defaultVariants: sidebarDefaults,
});

const sidebarGap = cva(sidebarClasses.gap, {
  variants: {
    variant: { sidebar: "", floating: "", inset: "" },
    collapsible: sidebarCollapsibleData.gap,
  },
  compoundVariants: sidebarGapCompoundData,
  defaultVariants: sidebarDefaults,
});

const sidebarPanel = cva(sidebarClasses.panel, {
  variants: {
    side: sidebarSideData.panel,
    variant: sidebarVariantData.panel,
    collapsible: sidebarCollapsibleData.panel,
  },
  compoundVariants: sidebarPanelCompoundData,
  defaultVariants: sidebarDefaults,
});

const sidebarInner = cva(sidebarClasses.inner, {
  variants: { variant: sidebarVariantData.inner },
  defaultVariants: sidebarDefaults,
});

/*
 * `overlay` defaults to on, so it is declared: without the declaration Vue casts an
 * absent boolean to `false` and the scrim behind the narrow panel disappears.
 */
const props = withDefaults(
  defineProps<
    SidebarRootProps<Component> & {
      class?: unknown;
    }
  >(),
  {
    overlay: true,
    side: sidebarDefaults.side,
    variant: sidebarDefaults.variant,
    collapsible: sidebarDefaults.collapsible,
  },
);

const open = defineModel<boolean>("open", { default: true });

const slots = defineSlots<{
  /** The scrolling middle of the column, usually a navigation. */
  default?: () => unknown;
  /** Buttons in the header, beside the close button. */
  actions?: () => unknown;
  /** A row along the bottom, usually an account or a theme switch. */
  footer?: () => unknown;
}>();

const mobile = useMediaQuery(sidebarMobileQuery);

/*
 * One state serves both viewports and the sidebar moves it across when the viewport
 * crosses: entering the narrow one remembers where the wide one was and closes the
 * panel, and leaving it puts the remembered value back. Without that, a sidebar
 * expanded by design would cover a phone's content the moment the page loaded.
 */
let wide = open.value;
watch(mobile, (isMobile, wasMobile) => {
  if (isMobile === wasMobile) return;
  if (isMobile) {
    wide = open.value;
    open.value = false;
  } else if (wasMobile !== undefined) {
    open.value = wide;
  }
});

const collapses = computed(() => props.collapsible !== "none");
const state = computed<SidebarState>(() =>
  open.value || !collapses.value ? "expanded" : "collapsed",
);
const closable = computed(() => collapses.value && (props.close || mobile.value));
const hasHeader = computed(
  () => props.title != null || props.description != null || slots.actions != null || closable.value,
);

const axes = computed(() => ({
  side: props.side,
  variant: props.variant,
  collapsible: props.collapsible,
}));

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get side() {
    return props.side;
  },
  get variant() {
    return props.variant;
  },
  get collapsible() {
    return props.collapsible;
  },
  get state() {
    return state.value;
  },
  get open() {
    return open.value;
  },
  setOpen: (next: boolean) => {
    open.value = next;
  },
  get mobile() {
    return mobile.value;
  },
});
provide(sidebarVariantsKey, resolved);

const rootClass = computed(() =>
  cn(sidebarRoot({ collapsible: props.collapsible }), props.class as string | undefined),
);
const gapClass = computed(() => sidebarGap(axes.value));
const panelClass = computed(() => sidebarPanel(axes.value));
const innerClass = computed(() => sidebarInner({ variant: props.variant }));
</script>

<template>
  <aside
    data-slot="sidebar"
    :data-state="state"
    :data-side="props.side"
    :data-variant="props.variant"
    :class="rootClass"
  >
    <!-- Reserves the column the fixed panel beside it occupies. -->
    <div data-slot="sidebar-gap" :data-state="state" :class="gapClass" />

    <div data-slot="sidebar-panel" :data-state="state" :class="panelClass">
      <div data-slot="sidebar-inner" :class="innerClass">
        <SidebarHeader v-if="hasHeader">
          <div
            v-if="props.title != null || props.description != null"
            data-slot="sidebar-heading"
            :class="sidebarClasses.heading"
          >
            <SidebarTitle v-if="props.title != null">{{ props.title }}</SidebarTitle>
            <SidebarDescription v-if="props.description != null">
              {{ props.description }}
            </SidebarDescription>
          </div>
          <SidebarActions v-if="$slots.actions || closable">
            <slot name="actions" />
            <SidebarCloseTrigger v-if="closable">
              <component :is="props.closeIcon" v-if="props.closeIcon" />
            </SidebarCloseTrigger>
          </SidebarActions>
        </SidebarHeader>

        <SidebarBody>
          <slot />
        </SidebarBody>
        <SidebarFooter v-if="$slots.footer">
          <slot name="footer" />
        </SidebarFooter>
      </div>

      <SidebarRail v-if="props.rail && collapses" />
    </div>
  </aside>

  <div
    v-if="props.overlay && collapses && mobile && open"
    data-slot="sidebar-backdrop"
    :class="sidebarClasses.backdrop"
    @click="open = false"
  />
</template>
