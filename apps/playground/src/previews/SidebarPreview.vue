<script setup lang="ts">
import { Sidebar } from "@75neo/vue/sidebar";
import { sidebarSchema } from "@75neo/themes";

const variants = sidebarSchema.variant.values;
const sides = sidebarSchema.side.values;

const frame = "relative h-56 overflow-hidden rounded-lg ring ring-default ring-inset";
const column = "h-full [--sidebar-width:12rem]";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <div :class="frame">
            <Sidebar
              collapsible="none"
              :variant="variant"
              title="75NeoUI"
              description="Components"
              :class="column"
            >
              <nav class="flex flex-col gap-1 text-sm text-toned">
                <a href="#button">Button</a>
                <a href="#select">Select</a>
                <a href="#dialog">Dialog</a>
              </nav>
            </Sidebar>
          </div>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="side in sides" :key="side" :class="row">
        <p :class="rowLabel" data-identifier>{{ side }}</p>
        <div :class="rowItems">
          <div :class="[frame, 'flex', side === 'end' ? 'justify-end' : '']">
            <Sidebar collapsible="none" :side="side" title="75NeoUI" :class="column">
              <nav class="flex flex-col gap-1 text-sm text-toned">
                <a href="#button">Button</a>
                <a href="#select">Select</a>
                <a href="#dialog">Dialog</a>
              </nav>
            </Sidebar>
          </div>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>footer</p>
        <div :class="rowItems">
          <div :class="frame">
            <Sidebar collapsible="none" title="75NeoUI" :class="column">
              <nav class="flex flex-col gap-1 text-sm text-toned">
                <a href="#button">Button</a>
                <a href="#select">Select</a>
                <a href="#dialog">Dialog</a>
              </nav>
              <template #footer>
                <span class="text-sm text-muted">Signed in</span>
              </template>
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
