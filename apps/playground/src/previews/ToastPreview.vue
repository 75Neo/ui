<script setup lang="ts">
import { Toaster, createToaster } from "@75neo/vue/toast";

const toaster = createToaster({ placement: "bottom-end", gap: 12, max: 3 });

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";

type ToastType = "info" | "success" | "warning" | "error" | "loading";

function notify(type: ToastType) {
  toaster.create({
    title: `${type[0].toUpperCase()}${type.slice(1)} toast`,
    description: "Created from the store, styled by its type.",
    type,
  });
}

function notifyAction() {
  toaster.create({
    title: "Undo available",
    description: "The file moved to trash.",
    action: { label: "Undo", onClick: () => {} },
  });
}
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>types</p>
        <div :class="rowItems">
          <button
            v-for="type in ['info', 'success', 'warning', 'error', 'loading'] as const"
            :key="type"
            type="button"
            @click="notify(type)"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>action</p>
        <div :class="rowItems">
          <button type="button" @click="notifyAction">Action toast</button>
        </div>
      </div>
    </div>

    <Toaster :toaster="toaster" />
  </div>
</template>
