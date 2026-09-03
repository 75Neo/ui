<script setup lang="ts">
import { ref } from "vue";
import { dialog, variantValues } from "@75neo/themes";
import { Button, Dialog } from "@75neo/vue";
import { TriangleAlert } from "@lucide/vue";

const sizes = variantValues(dialog, "size");
const open = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Dialog :size="size" title="Delete this project?" description="This cannot be undone.">
        <Button variant="outline" color="neutral" size="sm">The {{ size }} size</Button>

        <template #body>
          <p>
            Deleting <strong>rings-of-power</strong> removes its themes, its adapters and every
            preview built from them. Nothing here is recoverable from the playground.
          </p>
          <p class="mt-3">
            Members keep their accounts. Anything they published from this project stops resolving
            within the hour.
          </p>
        </template>

        <template #footer>
          <Button variant="ghost" color="neutral" size="sm">Cancel</Button>
          <Button color="error" size="sm">Delete project</Button>
        </template>
      </Dialog>
    </div>

    <hr class="border-muted" />

    <!-- Nothing but the buttons closes this one: no Escape, no click outside, no ✕. -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>insistent</p>
      <Dialog
        role="alertdialog"
        :dismissible="false"
        :close="false"
        title="Your session is about to expire"
        description="You will be signed out in two minutes."
      >
        <Button variant="outline" color="neutral" size="sm">Not dismissible</Button>

        <template #body>
          <p class="flex items-start gap-2">
            <TriangleAlert class="mt-0.5 size-4 shrink-0 text-warning" />
            <span>
              Escape does nothing here and neither does a click outside, because losing unsaved work
              to a stray keypress is worse than an extra click.
            </span>
          </p>
        </template>

        <template #footer>
          <Button color="warning" size="sm">Stay signed in</Button>
        </template>
      </Dialog>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>still</p>
      <Dialog
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
      </Dialog>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>fullscreen</p>
      <Dialog
        fullscreen
        title="The whole viewport"
        description="The panel fills the screen and the body scrolls inside it."
      >
        <Button variant="outline" color="neutral" size="sm">Fullscreen</Button>

        <template #body>
          <div class="flex flex-col gap-3">
            <p v-for="index in 12" :key="index">
              Paragraph {{ index }}. The header and the footer stay pinned while this scrolls,
              because the panel hides its own overflow and the body takes what height is left.
            </p>
          </div>
        </template>

        <template #footer>
          <Button variant="ghost" color="neutral" size="sm">Cancel</Button>
          <Button color="error" size="sm">Delete project</Button>
        </template>
      </Dialog>
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
      <Dialog
        v-model:open="open"
        title="Controlled"
        description="No trigger inside this one; the link above owns the state."
      >
        <template #body>
          <p>Closing it any way at all reports back through the model.</p>
        </template>
      </Dialog>
    </div>
  </div>
</template>
