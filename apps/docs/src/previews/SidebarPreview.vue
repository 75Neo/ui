<script setup lang="ts">
import { Files, Home, Settings, Users } from "@lucide/vue";
import { Container, Header, Main, Sidebar } from "@75neo/vue";

/* `transform-gpu` makes the frame the containing block for the panel's own `fixed`. */
const frame = "relative h-80 transform-gpu overflow-hidden rounded-lg ring ring-default";

/* The panel is `h-dvh` against the real viewport, which a framed specimen has to cap. */
const boxed = { container: "h-full", inner: "h-full" };

const items = [
  { label: "Overview", icon: Home },
  { label: "Files", icon: Files },
  { label: "People", icon: Users },
  { label: "Settings", icon: Settings },
];
</script>

<template>
  <div :class="frame">
    <div class="flex h-full">
      <Sidebar title="Acme" description="Workspace" close rail :ui="boxed">
        <nav class="flex flex-col gap-1">
          <a
            v-for="item in items"
            :key="item.label"
            href="#"
            class="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-toned hover:bg-elevated"
          >
            <component :is="item.icon" class="size-4 shrink-0" />
            <span class="truncate">{{ item.label }}</span>
          </a>
        </nav>
      </Sidebar>

      <div class="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Header title="Overview" :ui="{ base: 'h-14' }" />
        <Main :ui="{ base: 'min-h-0 flex-1' }">
          <Container class="py-6 text-sm text-muted">
            The spacer beside the panel keeps this column out from under it, so collapsing moves
            both together.
          </Container>
        </Main>
      </div>
    </div>
  </div>
</template>
