<script setup lang="ts">
import { Clipboard } from "@75neo/vue";

/**
 * The install command, as a Vue island.
 *
 * @remarks
 * A wrapper rather than the library component used straight from the page, because
 * Astro's checker infers nothing from a Vue component reached through a package
 * barrel: the props come back as bare attributes and every one of them is an error. A
 * local single-file component is typed the way the checker expects, and the page hands
 * it one string.
 */
defineProps<{ value: string }>();
</script>

<template>
  <Clipboard :value="value" size="lg" />
</template>
