import { useState } from "react";
import { hoverCard, variantValues } from "@75neo/themes";
import { Button, HoverCard } from "@75neo/react";

const sizes = variantValues(hoverCard, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const trigger = "cursor-pointer text-sm text-primary underline-offset-4 hover:underline";

const cardBody = (
  <div className="flex flex-col gap-2">
    <p>Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
    <p className="text-muted">
      <span className="font-semibold text-highlighted">14.5K</span> followers ·{" "}
      <span className="font-semibold text-highlighted">2,456</span> following
    </p>
  </div>
);

export default function HoverCardPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <p className="text-sm text-toned">
            Liked by{" "}
            <HoverCard size={size} title="Sarah Chen" description="@sarah_chen" body={cardBody}>
              <a href="#profile" className={trigger} onClick={(event) => event.preventDefault()}>
                @sarah_chen
              </a>
            </HoverCard>{" "}
            and 3 others
          </p>
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          arrow
        </p>
        <p className="text-sm text-toned">
          Reviewed by{" "}
          <HoverCard
            arrow
            title="Alex Rivera"
            description="@alex_r"
            body={<p>Full-stack developer and open source contributor.</p>}
          >
            <a href="#profile" className={trigger} onClick={(event) => event.preventDefault()}>
              @alex_r
            </a>
          </HoverCard>
        </p>
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          eager
        </p>
        <p className="text-sm text-toned">
          Mentioned by{" "}
          <HoverCard
            openDelay={100}
            closeDelay={100}
            title="Jordan Lee"
            description="@jordan_lee"
            body={<p>DevOps lead. Automating all the things.</p>}
          >
            <a href="#profile" className={trigger} onClick={(event) => event.preventDefault()}>
              @jordan_lee
            </a>
          </HoverCard>{" "}
          in passing
        </p>
      </div>

      <hr className="border-muted" />

      {/* Controlled: a button owns the state, and the card follows it. */}
      <div className="flex flex-col gap-2">
        <Button variant="outline" color="neutral" size="sm" onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"} the card
        </Button>
        <p className="text-sm text-toned">
          Pinned to{" "}
          <HoverCard
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
            title="Sarah Chen"
            description="@sarah_chen"
            body={cardBody}
          >
            <a href="#profile" className={trigger} onClick={(event) => event.preventDefault()}>
              @sarah_chen
            </a>
          </HoverCard>
        </p>
      </div>
    </div>
  );
}
