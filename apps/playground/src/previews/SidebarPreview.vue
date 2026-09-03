<script setup lang="ts">
import { Files, Home, Settings, Users } from "@lucide/vue";
import { sidebar, variantValues } from "@75neo/themes";
import { Container, Header, Main, Sidebar } from "@75neo/vue";

const variants = variantValues(sidebar, "variant");
const collapsibles = variantValues(sidebar, "collapsible");

const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

/*
 * The frame is `transform-gpu`, which makes it the containing block for the sidebar's
 * own `fixed` panel and for the scrim behind it, so a specimen stays inside its box.
 * In a real page both are measured against the viewport and nothing overrides them.
 */
const frame = "relative h-80 transform-gpu overflow-hidden rounded-lg ring ring-default";

/* The panel is `h-dvh` against the real viewport, which a frame this size has to cap. */
const boxed = { container: "h-full", inner: "h-full" };

const items = [
  { label: "Overview", icon: Home },
  { label: "Files", icon: Files },
  { label: "People", icon: Users },
  { label: "Settings", icon: Settings },
];

const shells = [
  ...variants.map((variant) => ({ name: variant, variant, collapsible: "offcanvas" as const })),
  ...collapsibles.map((collapsible) => ({
    name: collapsible,
    variant: "sidebar" as const,
    collapsible,
  })),
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <template v-for="(shell, at) in shells" :key="shell.name">
      <hr v-if="at === variants.length" class="border-muted" />

      <div class="flex flex-col gap-2">
        <p :class="label" data-identifier>{{ shell.name }}</p>

        <div :class="frame">
          <div class="flex h-full">
            <Sidebar
              :variant="shell.variant"
              :collapsible="shell.collapsible"
              title="Acme"
              description="Workspace"
              close
              rail
              :ui="boxed"
            >
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

              <template #footer>
                <span class="truncate text-sm text-muted">chien@acme.dev</span>
              </template>
            </Sidebar>

            <div class="flex min-w-0 flex-1 flex-col overflow-y-auto">
              <Header title="Overview" :ui="{ base: 'h-14' }" />
              <Main :ui="{ base: 'min-h-0 flex-1' }">
                <Container class="py-6 text-sm text-muted">
                  The spacer beside the panel is what keeps this column out from under it, so
                  collapsing moves both together.
                </Container>
              </Main>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
