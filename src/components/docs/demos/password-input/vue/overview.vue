<script setup lang="ts">
import { Eye, EyeOff } from "@lucide/vue";
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from "@/components/vue";
</script>

<template>
  <div class="max-w-sm">
    <PasswordInput>
      <PasswordInputLabel>Registry token</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Paste the token" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator>
            <template #fallback>
              <EyeOff />
            </template>
            <Eye />
          </PasswordInputIndicator>
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  </div>
</template>
