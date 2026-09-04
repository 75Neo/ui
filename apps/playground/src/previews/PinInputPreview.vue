<script setup lang="ts">
import { ref } from "vue";
import { pinInput, variantValues } from "@75neo/themes";
import { PinInput } from "@75neo/vue";

const sizes = variantValues(pinInput, "size");
const colors = variantValues(pinInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const code = ref(["1", "2", "3", "", "", ""]);
const done = ref("");
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <PinInput :size="size" :length="4" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the focus ring on a box and nothing else, so click into one to
      see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <PinInput :color="accent" size="sm" :length="4" :default-value="['7', '5', '', '']" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <PinInput label="Six digits" />
      <PinInput label="Letters too" type="alphanumeric" :length="5" />
      <PinInput label="Hidden" mask :length="4" :default-value="['1', '2', '3', '4']" />
      <PinInput label="Blank boxes" placeholder="" :length="4" />
      <PinInput label="Invalid" invalid :length="4" :default-value="['9', '9', '9', '9']" />
      <PinInput label="Disabled" disabled :length="4" :default-value="['1', '2', '3', '4']" />
    </div>

    <hr class="border-muted" />

    <!--
      Controlled: one entry per box, `""` for an empty one. Delete a character in the
      middle and watch the rest move back — a code with a gap in it is not a code.
    -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <PinInput
        v-model="code"
        label="Controlled"
        :length="6"
        @value-complete="done = $event.valueAsString"
      />
      <output class="font-mono text-sm text-toned">
        {{ JSON.stringify(code) }}<template v-if="done !== ''"> → {{ done }}</template>
      </output>
    </div>
  </div>
</template>
