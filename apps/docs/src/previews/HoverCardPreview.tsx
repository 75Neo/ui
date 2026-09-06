import { HoverCard } from "@75neo/react/hover-card";

export function HoverCardPreview() {
  return (
    <HoverCard
      title="@handle"
      description="Joined in 2021 · 4.2k followers"
      body="Hover the name to see who is behind it."
    >
      <button type="button">@handle</button>
    </HoverCard>
  );
}
