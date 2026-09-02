import { useState } from "react";
import { checkbox, variantValues } from "@75neo/themes";
import { Checkbox } from "@75neo/react";

const sizes = variantValues(checkbox, "size");
const colors = variantValues(checkbox, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const scopes = ["Read", "Write", "Delete"];

export default function CheckboxPreview() {
  const [granted, setGranted] = useState<string[]>(["Read"]);
  const all = granted.length === scopes.length;
  const some = granted.length > 0;

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Checkbox size={size} label={`Ship it (${size})`} defaultChecked />
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Checkbox color={color} label="Checked" defaultChecked />
            <Checkbox color={color} label="Unchecked" />
            <Checkbox color={color} label="Indeterminate" defaultChecked="indeterminate" />
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-col gap-4">
        <Checkbox
          label="Weekly digest"
          description="One email on Monday with everything that changed. Unsubscribe any time."
        />
        <Checkbox label="Disabled and checked" defaultChecked disabled />
        <Checkbox label="Invalid" color="error" invalid />
      </div>

      <hr className="border-muted" />

      {/* Indeterminate is a third state rather than a style: the parent reads its children. */}
      <div className="flex flex-col gap-2">
        <Checkbox
          label="All scopes"
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(details) => setGranted(details.checked === true ? [...scopes] : [])}
        />
        <div className="ms-6 flex flex-col gap-2">
          {scopes.map((scope) => (
            <Checkbox
              key={scope}
              label={scope}
              checked={granted.includes(scope)}
              onCheckedChange={(details) =>
                setGranted((current) =>
                  details.checked === true
                    ? [...current, scope]
                    : current.filter((held) => held !== scope),
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
