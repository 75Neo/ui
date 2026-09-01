import { type ReactNode, useState } from "react";
import { angleSlider, variantValues } from "@75neo/themes";
import { AngleSlider } from "@75neo/react";

const sizes = variantValues(angleSlider, "size");
const colors = variantValues(angleSlider, "color");

const ticks = [0, 45, 90, 135, 180, 225, 270, 315];

/*
 * Both adapters render this scaffold, so the two stages line up row for row and
 * any divergence between React and Vue shows as a break in the rhythm rather
 * than as something you have to hunt for.
 */
const row = "grid gap-3 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const rowItems = "flex flex-wrap items-center gap-6";
const group = "flex flex-col gap-6";
const rule = "border-muted my-7";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

/*
 * The controlled row is the only place the two value APIs differ -- `value` and
 * `onValueChange` here, `v-model` in the Vue preview -- so it is worth seeing the
 * two side by side, driving the same readout.
 */
function Controlled() {
  const [value, setValue] = useState(120);

  return (
    <>
      <AngleSlider
        value={value}
        onValueChange={(details) => setValue(details.value)}
        showValue
        label="degrees"
      />
      <p className="font-mono text-xs text-toned" data-identifier>
        {value}°
      </p>
    </>
  );
}

export default function AngleSliderPreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="size">
          {sizes.map((size) => (
            <AngleSlider key={size} size={size} defaultValue={45} showValue label="degrees" />
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="color">
          {colors.map((color) => (
            <AngleSlider key={color} size="sm" color={color} defaultValue={225} label={color} />
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="markers">
          <AngleSlider defaultValue={90} markers={ticks} showValue />
        </Row>

        <Row label="step">
          <AngleSlider defaultValue={90} step={15} markers={ticks} showValue label="15° steps" />
        </Row>

        <Row label="state">
          <AngleSlider defaultValue={45} disabled showValue label="disabled" />
          <AngleSlider defaultValue={45} readOnly showValue label="read only" />
        </Row>

        <Row label="controlled">
          <Controlled />
        </Row>
      </div>
    </div>
  );
}
