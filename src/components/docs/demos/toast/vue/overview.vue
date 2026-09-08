<script setup lang="ts">
import { createToaster } from "@ark-ui/vue/toast";
import { X } from "@lucide/vue";
import {
  Button,
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  Toaster,
  ToastTitle,
} from "@/components/vue";

const toaster = createToaster({ placement: "bottom-end", overlap: true, gap: 12 });
</script>

<template>
  <div class="flex justify-center">
    <Button
      variant="outline"
      @click="
        toaster.create({
          title: 'Button installed',
          description: 'Two files written to src/components/ui/button.',
        })
      "
    >
      Install the button
    </Button>

    <Toaster v-slot="toast" :toaster="toaster">
      <Toast>
        <ToastTitle>{{ toast.title }}</ToastTitle>
        <ToastDescription>{{ toast.description }}</ToastDescription>
        <ToastCloseTrigger aria-label="Dismiss">
          <X />
        </ToastCloseTrigger>
      </Toast>
    </Toaster>
  </div>
</template>
