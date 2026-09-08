<script setup lang="ts">
import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputLabel,
} from "@/components/vue";
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
