<script setup lang="ts">
import { X } from "@lucide/vue";
import { createToaster } from "@ark-ui/vue/toast";
import Button from "@/registry/vue/ui/button/Button.vue";
import Toast from "@/registry/vue/ui/toast/Toast.vue";
import ToastCloseTrigger from "@/registry/vue/ui/toast/ToastCloseTrigger.vue";
import ToastDescription from "@/registry/vue/ui/toast/ToastDescription.vue";
import Toaster from "@/registry/vue/ui/toast/Toaster.vue";
import ToastTitle from "@/registry/vue/ui/toast/ToastTitle.vue";

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

    <Toaster :toaster="toaster" v-slot="toast">
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
