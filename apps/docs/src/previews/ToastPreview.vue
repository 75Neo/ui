<script setup lang="ts">
import { Toaster, createToaster } from "@75neo/vue/toast";

const toaster = createToaster({ placement: "bottom-end" });

function schedule() {
  toaster.create({
    title: "Scheduled for tomorrow",
    description: "Your meeting is at 10am.",
    type: "info",
  });
}
</script>

<template>
  <div>
    <button type="button" @click="schedule">Schedule meeting</button>
    <Toaster :toaster="toaster" />
  </div>
</template>
