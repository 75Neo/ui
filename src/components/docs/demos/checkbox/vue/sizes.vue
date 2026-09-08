<script setup lang="ts">
import { Check } from "@lucide/vue";
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Checkbox v-for="size in sizes" :key="size" :size="size" default-checked>
      <CheckboxControl>
        <CheckboxIndicator>
          <Check />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>{{ size }}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  </div>
</template>
