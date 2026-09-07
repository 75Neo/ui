<script setup lang="ts">
import Avatar from "@/registry/vue/ui/avatar/Avatar.vue";
import AvatarFallback from "@/registry/vue/ui/avatar/AvatarFallback.vue";
import HoverCard from "@/registry/vue/ui/hover-card/HoverCard.vue";
import HoverCardArrow from "@/registry/vue/ui/hover-card/HoverCardArrow.vue";
import HoverCardArrowTip from "@/registry/vue/ui/hover-card/HoverCardArrowTip.vue";
import HoverCardContent from "@/registry/vue/ui/hover-card/HoverCardContent.vue";
import HoverCardPositioner from "@/registry/vue/ui/hover-card/HoverCardPositioner.vue";
import HoverCardTrigger from "@/registry/vue/ui/hover-card/HoverCardTrigger.vue";
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
