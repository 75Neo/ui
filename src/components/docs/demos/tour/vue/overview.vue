<script setup lang="ts">
import { useTour, type TourStepDetails } from "@ark-ui/vue/tour";
import { X } from "@lucide/vue";
import {
  Button,
  Tour,
  TourActions,
  TourActionTrigger,
  TourBackdrop,
  TourCloseTrigger,
  TourContent,
  TourControl,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
} from "@/components/vue";

const steps: TourStepDetails[] = [
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

const tour = useTour({ steps });
</script>

<template>
  <div class="flex justify-center">
    <Tour :tour="tour">
      <Button data-tour-target variant="outline" @click="tour.start()">Start the tour</Button>

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
