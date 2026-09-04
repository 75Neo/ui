import { tour, variantValues } from "@75neo/themes";
import { Button, Tour, useTour, type TourStepDetails } from "@75neo/react";
import { Sparkles } from "lucide-react";

const sizes = variantValues(tour, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const steps: TourStepDetails[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome to the tour",
    description: "Two buttons below want showing off. This first stop is a dialog, not a tooltip.",
    actions: [{ label: "Show me", action: "next" }],
  },
  {
    id: "upload",
    type: "tooltip",
    title: "Upload files",
    description: "Click here to upload files to the cloud, or so the tooltip claims.",
    target: () => document.querySelector<HTMLElement>("#tour-upload"),
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "save",
    type: "tooltip",
    title: "Save changes",
    description:
      "Save the work to keep the progress. The spotlight is the ring around this button.",
    target: () => document.querySelector<HTMLElement>("#tour-save"),
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
];

const targetButton =
  "cursor-pointer rounded-md px-3 py-1.5 text-sm ring ring-accented ring-inset hover:bg-elevated";

export default function TourPreview() {
  const trip = useTour({ steps });

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" leadingIcon={<Sparkles />} onClick={() => trip.start()}>
          Start tour
        </Button>
        <p className="text-sm text-muted">
          {trip.open ? `On step ${trip.stepIndex + 1} of ${trip.totalSteps}` : "The tour is idle."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button id="tour-upload" type="button" className={targetButton}>
          Upload
        </button>
        <button id="tour-save" type="button" className={targetButton}>
          Save
        </button>
      </div>

      <Tour tour={trip} />

      <hr className="border-muted" />

      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <TourStarter size={size} />
        </div>
      ))}
    </div>
  );
}

/*
 * One tour object per panel size, because the size lives on the panel rather than on
 * the steps. Each row starts the same three steps in its own width.
 */
function TourStarter({ size }: { size: (typeof sizes)[number] }) {
  const trip = useTour({ steps });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" color="neutral" size="sm" onClick={() => trip.start()}>
        Start the {size} panel
      </Button>
      <Tour tour={trip} size={size} />
    </div>
  );
}
