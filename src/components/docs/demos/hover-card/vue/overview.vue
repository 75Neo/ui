<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from "@/components/vue";
</script>

<template>
  <div class="flex justify-center py-6">
    <HoverCard :open-delay="300">
      <HoverCardTrigger
        class="cursor-pointer font-medium text-primary underline decoration-primary/40 underline-offset-4"
      >
        Ark UI
      </HoverCardTrigger>

      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>

          <div class="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <p class="font-medium text-default">Ark UI</p>
          </div>
          <p class="text-muted">
            The state machines behind every component here that has behaviour, shipped to React and
            Vue from one source.
          </p>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>
  </div>
</template>
