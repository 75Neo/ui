<script setup lang="ts">
import { ref } from "vue";
import { radioGroup, variantValues } from "@75neo/themes";
import { RadioGroup } from "@75neo/vue";

const sizes = variantValues(radioGroup, "size");
const colors = variantValues(radioGroup, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team", disabled: true },
];

const described = [
  { value: "weekly", label: "Weekly", description: "One digest on Monday morning." },
  { value: "daily", label: "Daily", description: "One digest a day, at nine." },
  { value: "never", label: "Never", description: "Nothing at all, ever." },
];

const plan = ref("pro");
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <RadioGroup
        :size="size"
        legend="Plan"
        :items="plans"
        default-value="free"
        orientation="horizontal"
      />
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <RadioGroup
        :color="color"
        legend="Plan"
        :items="plans"
        default-value="pro"
        orientation="horizontal"
      />
    </div>

    <hr class="border-muted" />

    <!--
      A description turns each option into a two-line block, which is what the control's
      own container lines up against.
    -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>described</p>
      <RadioGroup legend="Digest" :items="described" default-value="weekly" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>invalid</p>
      <RadioGroup legend="Plan" :items="plans" default-value="free" invalid />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>disabled</p>
      <RadioGroup legend="Plan" :items="plans" default-value="free" disabled />
    </div>

    <hr class="border-muted" />

    <!-- Controlled, so the heading can answer for the choice rather than repeat it. -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>controlled</p>
      <RadioGroup
        v-model="plan"
        color="secondary"
        :legend="`Currently on ${plan}`"
        :items="plans"
      />
    </div>
  </div>
</template>
