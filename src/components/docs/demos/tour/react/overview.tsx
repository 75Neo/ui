import { Portal } from "@ark-ui/react/portal";
import { useTour, type TourStepDetails } from "@ark-ui/react/tour";
import { X } from "lucide-react";
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
} from "@/components/react";

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

export default function TourOverview() {
  const tour = useTour({ steps });

  return (
    <div className="flex justify-center">
      <Tour tour={tour}>
        <Button data-tour-target variant="outline" onClick={() => tour.start()}>
          Start the tour
        </Button>

        <Portal>
          <TourBackdrop />
          <TourSpotlight />
          <TourPositioner>
            <TourContent>
              <TourTitle />
              <TourDescription />
              <TourControl>
                <TourProgressText />
                <TourActions>
                  {(actions) =>
                    actions.map((action) => (
                      <TourActionTrigger key={action.label} action={action} />
                    ))
                  }
                </TourActions>
              </TourControl>
              <TourCloseTrigger aria-label="Close">
                <X />
              </TourCloseTrigger>
            </TourContent>
          </TourPositioner>
        </Portal>
      </Tour>
    </div>
  );
}
