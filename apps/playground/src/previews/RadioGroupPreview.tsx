import { useState } from "react";
import { radioGroup, variantValues } from "@75neo/themes";
import { RadioGroup } from "@75neo/react";

const sizes = variantValues(radioGroup, "size");
const colors = variantValues(radioGroup, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team", disabled: true },
];

const described = [
  { value: "weekly", label: "Weekly", description: "One digest on Monday morning." },
  { value: "daily", label: "Daily", description: "One digest a day, at nine." },
  { value: "never", label: "Never", description: "Nothing at all, ever." },
];

export default function RadioGroupPreview() {
  const [plan, setPlan] = useState("pro");

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <RadioGroup
            size={size}
            legend="Plan"
            items={plans}
            defaultValue="free"
            orientation="horizontal"
          />
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <RadioGroup
            color={color}
            legend="Plan"
            items={plans}
            defaultValue="pro"
            orientation="horizontal"
          />
        </div>
      ))}

      <hr className="border-muted" />

      {/* A description turns each option into a two-line block, which is what the
          control's own container lines up against. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          described
        </p>
        <RadioGroup legend="Digest" items={described} defaultValue="weekly" />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          invalid
        </p>
        <RadioGroup legend="Plan" items={plans} defaultValue="free" invalid />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          disabled
        </p>
        <RadioGroup legend="Plan" items={plans} defaultValue="free" disabled />
      </div>

      <hr className="border-muted" />

      {/* Controlled, so the heading can answer for the choice rather than repeat it. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          controlled
        </p>
        <RadioGroup
          color="secondary"
          legend={`Currently on ${plan}`}
          items={plans}
          value={plan}
          // Ark clears the value when a group is reset, which this one never is.
          onValueChange={(details) => setPlan((current) => details.value ?? current)}
        />
      </div>
    </div>
  );
}
