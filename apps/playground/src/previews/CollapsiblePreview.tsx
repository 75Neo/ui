import { useState } from "react";
import { collapsible, variantValues } from "@75neo/themes";
import { Collapsible } from "@75neo/react";
import { Sparkles } from "lucide-react";

const variants = variantValues(collapsible, "variant");
const sizes = variantValues(collapsible, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";

const body =
  "One recipe in @75neo/themes drives both adapters. The panel measures itself, hands " +
  "the height to the shared keyframes, and animates from there.";

export default function CollapsiblePreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className={row}>
          <p className={rowLabel} data-identifier>
            {variant}
          </p>
          <Collapsible variant={variant} label={`The ${variant} variant`} defaultOpen>
            {body}
          </Collapsible>
        </div>
      ))}

      <hr className="border-muted" />

      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Collapsible size={size} label={`The ${size} size`} icon={<Sparkles />}>
            {body}
          </Collapsible>
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          disabled
        </p>
        <Collapsible label="Nothing opens this" disabled>
          {body}
        </Collapsible>
      </div>

      {/* A collapsedHeight clips the panel instead of hiding it, which is a "show more". */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          peek
        </p>
        <Collapsible label="Show more" collapsedHeight="3rem" variant="soft">
          <p>{body}</p>
          <p className="mt-2">
            A collapsed height leaves the panel clipped rather than hidden, so the first lines stay
            on the page and the rest slides in behind them.
          </p>
        </Collapsible>
      </div>

      <hr className="border-muted" />

      {/* Controlled: the button outside owns the state. */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Close from out here" : "Open from out here"}
        </button>
        <Collapsible
          variant="ghost"
          label="Controlled"
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
        >
          {body}
        </Collapsible>
      </div>
    </div>
  );
}
