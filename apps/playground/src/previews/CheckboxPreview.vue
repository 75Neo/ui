<script setup lang="ts">
import { computed, ref } from "vue";
import { checkbox, variantValues } from "@75neo/themes";
import { Checkbox } from "@75neo/vue";

const sizes = variantValues(checkbox, "size");
const colors = variantValues(checkbox, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const scopes = ["Read", "Write", "Delete"];
const granted = ref<string[]>(["Read"]);

const all = computed<boolean | "indeterminate">(() => {
  if (granted.value.length === scopes.length) return true;
  return granted.value.length > 0 ? "indeterminate" : false;
});

function toggleAll(checked: boolean | "indeterminate"): void {
  granted.value = checked === true ? [...scopes] : [];
}

function toggleScope(scope: string, checked: boolean | "indeterminate"): void {
  granted.value =
    checked === true ? [...granted.value, scope] : granted.value.filter((held) => held !== scope);
}
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Checkbox :size="size" :label="`Ship it (${size})`" default-checked />
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <div class="flex flex-wrap items-center gap-6">
        <Checkbox :color="color" label="Checked" default-checked />
        <Checkbox :color="color" label="Unchecked" />
        <Checkbox :color="color" label="Indeterminate" default-checked="indeterminate" />
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-col gap-4">
      <Checkbox
        label="Weekly digest"
        description="One email on Monday with everything that changed. Unsubscribe any time."
      />
      <Checkbox label="Disabled and checked" default-checked disabled />
      <Checkbox label="Invalid" color="error" invalid />
    </div>

    <hr class="border-muted" />

    <!-- Indeterminate is a third state rather than a style: the parent reads its children. -->
    <div class="flex flex-col gap-2">
      <Checkbox
        label="All scopes"
        :checked="all"
        @checked-change="(details) => toggleAll(details.checked)"
      />
      <div class="ms-6 flex flex-col gap-2">
        <Checkbox
          v-for="scope in scopes"
          :key="scope"
          :label="scope"
          :checked="granted.includes(scope)"
          @checked-change="(details) => toggleScope(scope, details.checked)"
        />
      </div>
    </div>
  </div>
</template>
