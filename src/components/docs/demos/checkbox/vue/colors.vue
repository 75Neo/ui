<script setup lang="ts">
import { Check } from "@lucide/vue";
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/vue";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Checkbox v-for="color in colors" :key="color" :color="color" default-checked>
      <CheckboxControl>
        <CheckboxIndicator>
          <Check />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>{{ color }}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  </div>
</template>
