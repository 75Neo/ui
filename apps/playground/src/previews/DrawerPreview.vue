<script setup lang="ts">
import { ref } from "vue";
import { drawer, variantValues } from "@75neo/themes";
import { Button, Drawer } from "@75neo/vue";

const placements = variantValues(drawer, "placement");
const sizes = variantValues(drawer, "size");
const open = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="placement in placements" :key="placement" :class="row">
      <p :class="rowLabel" data-identifier>{{ placement }}</p>
      <Drawer :placement="placement" title="Notifications" description="You are all caught up.">
        <Button variant="outline" color="neutral" size="sm">The {{ placement }} edge</Button>

        <template #body>
          <p>
            The header and the footer stay pinned while this scrolls, because the panel hides its
            own overflow and the body takes what height is left.
          </p>
          <p class="mt-3">
            Escape and a click outside close it, the same as a dialog — a drawer is a dialog
            anchored to an edge.
          </p>
        </template>

        <template #footer>
          <Button variant="ghost" color="neutral" size="sm">Cancel</Button>
          <Button color="primary" size="sm">Save changes</Button>
        </template>
      </Drawer>
    </div>

    <hr class="border-muted" />

    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Drawer
        :size="size"
        title="Edit profile"
        description="A width on a side drawer, a height on a top or bottom one."
      >
        <Button variant="outline" color="neutral" size="sm">The {{ size }} size</Button>

        <template #body>
          <p>
            The header and the footer stay pinned while this scrolls, because the panel hides its
            own overflow and the body takes what height is left.
          </p>
        </template>

        <template #footer>
          <Button variant="ghost" color="neutral" size="sm">Cancel</Button>
          <Button color="primary" size="sm">Save changes</Button>
        </template>
      </Drawer>
    </div>

    <hr class="border-muted" />

    <!-- Nothing but the buttons closes this one: no Escape, no click outside, no ✕. -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>insistent</p>
      <Drawer
        role="alertdialog"
        :dismissible="false"
        :close="false"
        title="Discard your changes?"
        description="Nothing here is saved yet."
      >
        <Button variant="outline" color="neutral" size="sm">Not dismissible</Button>

        <template #body>
          <p>Escape does nothing here and neither does a click outside.</p>
        </template>

        <template #footer>
          <Button variant="ghost" color="neutral" size="sm">Cancel</Button>
          <Button color="primary" size="sm">Save changes</Button>
        </template>
      </Drawer>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>still</p>
      <Drawer
        :transition="false"
        :overlay="false"
        title="No motion, no overlay"
        description="The panel appears and leaves without animating, over an undimmed page."
      >
        <Button variant="outline" color="neutral" size="sm">No transition</Button>

        <template #body>
          <p>
            Turn the transition off where the application already honours prefers-reduced-motion.
          </p>
        </template>
      </Drawer>
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the button outside owns the state, and there is no trigger inside. -->
    <div class="flex flex-col gap-2">
      <button
        type="button"
        class="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
        @click="open = true"
      >
        Open from out here
      </button>
      <Drawer
        v-model:open="open"
        title="Controlled"
        description="No trigger inside this one; the link above owns the state."
      >
        <template #body>
          <p>Closing it any way at all reports back through the model.</p>
        </template>
      </Drawer>
    </div>
  </div>
</template>
