import {
  Avatar,
  AvatarFallback,
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from "@/components/react";

export default function HoverCardOverview() {
  return (
    <div className="flex justify-center py-6">
      <HoverCard openDelay={300}>
        <HoverCardTrigger className="cursor-pointer font-medium text-primary underline decoration-primary/40 underline-offset-4">
          Ark UI
        </HoverCardTrigger>

        <HoverCardPositioner>
          <HoverCardContent>
            <HoverCardArrow>
              <HoverCardArrowTip />
            </HoverCardArrow>

            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <p className="font-medium text-default">Ark UI</p>
            </div>
            <p className="text-muted">
              The state machines behind every component here that has behaviour, shipped to React
              and Vue from one source.
            </p>
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    </div>
  );
}
