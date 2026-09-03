<script setup lang="ts">
import { CreditCard, KeyRound, User } from "@lucide/vue";
import { tabs, variantValues } from "@75neo/themes";
import { Tabs } from "@75neo/vue";

const variants = variantValues(tabs, "variant");
const sizes = variantValues(tabs, "size");
const colors = variantValues(tabs, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const items = [
  {
    value: "account",
    label: "Account",
    content: "Your name, your handle, your avatar.",
    icon: User,
  },
  { value: "password", label: "Password", content: "A new one, twice.", icon: KeyRound },
  {
    value: "billing",
    label: "Billing",
    content: "Card on file and last twelve invoices.",
    icon: CreditCard,
  },
  { value: "closed", label: "Closed", content: "Nothing here.", disabled: true },
];
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="variant in variants" :key="variant" :class="row">
      <p :class="rowLabel" data-identifier>{{ variant }}</p>
      <Tabs :variant="variant" :items="items" default-value="account" />
    </div>

    <hr class="border-muted" />

    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Tabs :size="size" :items="items" default-value="account" />
    </div>

    <hr class="border-muted" />

    <!--
      A pill is a raised surface, so the color goes on the selected label; a link has no
      surface, so the color is the line.
    -->
    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <div class="flex flex-col gap-3">
        <Tabs :color="color" :items="items" default-value="account" />
        <Tabs variant="link" :color="color" :items="items" default-value="password" />
      </div>
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <Tabs orientation="vertical" :items="items" default-value="account" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>markup</p>
      <Tabs variant="link" :items="items" default-value="billing">
        <template #content="{ item }">
          <p class="text-muted">
            <span class="font-medium text-highlighted">{{ item.label }}</span> — rendered by the
            call site rather than read off the item.
          </p>
        </template>
      </Tabs>
    </div>
  </div>
</template>
