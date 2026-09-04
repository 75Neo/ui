<script setup lang="ts">
import { ref } from "vue";
import { passwordInput, variantValues } from "@75neo/themes";
import { PasswordInput } from "@75neo/vue";
import { Lock } from "@lucide/vue";

const sizes = variantValues(passwordInput, "size");
const colors = variantValues(passwordInput, "color");

const visible = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <PasswordInput
        :size="size"
        label="Password"
        placeholder="hunter2"
        :leading-icon="Lock"
        :default-visible="size === 'lg'"
      />
    </div>

    <hr class="border-muted" />

    <!-- The accent reaches the focus ring, so tab in to see it. -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <PasswordInput :color="accent" size="sm" placeholder="hunter2" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <PasswordInput
        label="New password"
        placeholder="Something memorable"
        auto-complete="new-password"
      />
      <PasswordInput label="Invalid" placeholder="hunter2" invalid />
      <PasswordInput label="Read-only" placeholder="hunter2" read-only />
      <PasswordInput label="Disabled" placeholder="hunter2" disabled />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the eye reports back, and the link below drives it. -->
    <div class="flex flex-col gap-2">
      <PasswordInput v-model:visible="visible" label="Controlled" placeholder="hunter2" />
      <button
        type="button"
        class="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
        @click="visible = !visible"
      >
        {{ visible ? "Hide it again" : "Show it from out here" }}
      </button>
    </div>
  </div>
</template>
