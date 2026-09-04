import { useState } from "react";
import { steps, variantValues, type StepsItem } from "@75neo/themes";
import { Steps } from "@75neo/react";

const sizes = variantValues(steps, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const items: StepsItem[] = [
  {
    title: "Contact info",
    description: "Where do we reach you?",
    content: "Name, email and a phone number. Nothing here is shared until the last step.",
  },
  {
    title: "Date and time",
    description: "When should it happen?",
    content: "Pick a day and a slot. Weekends cost extra and read about right on the invoice.",
  },
  {
    title: "Select rooms",
    description: "How much space?",
    content: "One room per guest, and the attic is not a room no matter what the listing says.",
  },
];

export default function StepsPreview() {
  const [step, setStep] = useState(0);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Steps
            size={size}
            items={items}
            completedContent="Steps complete — thank you for filling out the form."
          />
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <Steps orientation="vertical" items={items} />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          linear
        </p>
        <Steps linear items={items} defaultStep={1} />
      </div>

      <hr className="border-muted" />

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          Controlled: on step {step + 1} of {items.length} — the buttons below jump without the
          panel's own.
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className="cursor-pointer rounded-md px-2 py-1 text-sm ring ring-accented ring-inset hover:bg-elevated"
              onClick={() => setStep(index)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <Steps step={step} onStepChange={(details) => setStep(details.step)} items={items} />
      </div>
    </div>
  );
}
