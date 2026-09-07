<script setup lang="ts">
import PinInput from "@/registry/vue/ui/pin-input/PinInput.vue";
import PinInputControl from "@/registry/vue/ui/pin-input/PinInputControl.vue";
import PinInputHiddenInput from "@/registry/vue/ui/pin-input/PinInputHiddenInput.vue";
import PinInputInput from "@/registry/vue/ui/pin-input/PinInputInput.vue";
import PinInputLabel from "@/registry/vue/ui/pin-input/PinInputLabel.vue";
</script>

<template>
  <PinInput otp placeholder="0">
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInput v-for="index in [0, 1, 2, 3]" :key="index" :index="index" />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</template>
