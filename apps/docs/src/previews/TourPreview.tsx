import { Tour, useTour } from "@75neo/react/tour";

const steps = [
  {
    id: "welcome",
    type: "dialog" as const,
    title: "Welcome!",
    description: "A quick walk over the page.",
    actions: [{ label: "Start", action: "next" as const }],
  },
  {
    id: "done",
    type: "dialog" as const,
    title: "All set!",
    description: "That was the whole tour.",
    actions: [{ label: "Finish", action: "dismiss" as const }],
  },
];

export function TourPreview() {
  const tour = useTour({ steps });

  return (
    <div>
      <button type="button" onClick={() => tour.start()}>
        Start tour
      </button>
      <Tour tour={tour} />
    </div>
  );
}
