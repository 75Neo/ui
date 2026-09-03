<script setup lang="ts">
import { CreditCard, KeyRound, User } from "@lucide/vue";
import { Tabs } from "@75neo/vue";

const items = [
  {
    value: "account",
    label: "Account",
    content: "Your name, your handle, and the avatar everyone sees.",
    icon: User,
  },
  { value: "password", label: "Password", content: "A new one, twice.", icon: KeyRound },
  {
    value: "billing",
    label: "Billing",
    content: "The card on file and the last twelve invoices.",
    icon: CreditCard,
  },
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <Tabs :items="items" default-value="account" />
    <Tabs variant="link" color="secondary" :items="items" default-value="password" />
  </div>
</template>
