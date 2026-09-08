<script setup lang="ts">
import { ref } from "vue";
import { X } from "@lucide/vue";
import type { StepDetails } from "@ark-ui/vue/tour";
import Button from "@/registry/vue/ui/button/Button.vue";
import Tour from "@/registry/vue/ui/tour/Tour.vue";
import TourActionTrigger from "@/registry/vue/ui/tour/TourActionTrigger.vue";
import TourActions from "@/registry/vue/ui/tour/TourActions.vue";
import TourBackdrop from "@/registry/vue/ui/tour/TourBackdrop.vue";
import TourCloseTrigger from "@/registry/vue/ui/tour/TourCloseTrigger.vue";
import TourContent from "@/registry/vue/ui/tour/TourContent.vue";
import TourControl from "@/registry/vue/ui/tour/TourControl.vue";
import TourDescription from "@/registry/vue/ui/tour/TourDescription.vue";
import TourPositioner from "@/registry/vue/ui/tour/TourPositioner.vue";
import TourProgressText from "@/registry/vue/ui/tour/TourProgressText.vue";
import TourSpotlight from "@/registry/vue/ui/tour/TourSpotlight.vue";
import TourTitle from "@/registry/vue/ui/tour/TourTitle.vue";

const steps: StepDetails[] = [
  {
    id: "start",
    type: "dialog",
    title: "A guided walk",
    description: "Three steps, each one anchored to something on the page.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "trigger",
    type: "tooltip",
    target: () => document.querySelector("[data-tour-target]"),
    title: "The trigger",
    description: "This is the button that started the tour.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "end",
    type: "dialog",
    title: "That is all",
    description: "The backdrop and the spotlight go away when the tour finishes.",
    actions: [{ label: "Done", action: "dismiss" }],
  },
];

const tour = ref();
</script>

<template>
  <div class="flex justify-center">
    <Tour ref="tour" :steps="steps">
      <Button data-tour-target variant="outline" @click="tour?.start()">Start the tour</Button>

      <Teleport to="body">
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <TourControl>
              <TourProgressText />
              <TourActions v-slot="{ actions }">
                <TourActionTrigger v-for="action in actions" :key="action.label" :action="action">
                  {{ action.label }}
                </TourActionTrigger>
              </TourActions>
            </TourControl>
            <TourCloseTrigger aria-label="Close">
              <X />
            </TourCloseTrigger>
          </TourContent>
        </TourPositioner>
      </Teleport>
    </Tour>
  </div>
</template>
