<script setup lang="ts">
import { ref } from "vue";
import { floatingPanel, variantValues } from "@75neo/themes";
import { Button, FloatingPanel } from "@75neo/vue";

const sizes = variantValues(floatingPanel, "size");
const open = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <FloatingPanel :size="size" title="Floating panel">
        <Button variant="outline" color="neutral" size="sm">The {{ size }} size</Button>

        <template #body>
          <p>Drag the header to move this panel, and pull any edge or corner to resize it.</p>
          <p class="mt-3">
            The page stays usable around it — a floating panel never takes the page modal.
          </p>
        </template>
      </FloatingPanel>
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>minimal</p>
      <FloatingPanel title="No chrome to spare" :stages="['minimized', 'default']">
        <Button variant="outline" color="neutral" size="sm">Fewer stages</Button>

        <template #body>
          <p>Only minimize and restore — nothing here maximizes.</p>
        </template>
      </FloatingPanel>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>fixed</p>
      <FloatingPanel title="Hands off" :draggable="false" :resizable="false">
        <Button variant="outline" color="neutral" size="sm">Locked in place</Button>

        <template #body>
          <p>Neither the header drags nor the edges resize on this one.</p>
        </template>
      </FloatingPanel>
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the button outside owns the state, and there is no trigger inside. -->
    <div class="flex flex-col gap-2">
      <Button variant="outline" color="neutral" size="sm" @click="open = true">
        Open from out here
      </Button>
      <FloatingPanel v-model:open="open" title="Controlled">
        <template #body>
          <p>Closing it any way at all reports back through the model.</p>
        </template>
      </FloatingPanel>
    </div>
  </div>
</template>
