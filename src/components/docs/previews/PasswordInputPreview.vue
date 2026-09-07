<script setup lang="ts">
import { Eye, EyeOff } from "@lucide/vue";
import PasswordInput from "@/registry/vue/ui/password-input/PasswordInput.vue";
import PasswordInputControl from "@/registry/vue/ui/password-input/PasswordInputControl.vue";
import PasswordInputIndicator from "@/registry/vue/ui/password-input/PasswordInputIndicator.vue";
import PasswordInputInput from "@/registry/vue/ui/password-input/PasswordInputInput.vue";
import PasswordInputLabel from "@/registry/vue/ui/password-input/PasswordInputLabel.vue";
import PasswordInputVisibilityTrigger from "@/registry/vue/ui/password-input/PasswordInputVisibilityTrigger.vue";
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
