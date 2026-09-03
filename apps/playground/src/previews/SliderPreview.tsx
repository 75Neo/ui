import { useState } from "react";
import { slider, variantValues } from "@75neo/themes";
import { Slider } from "@75neo/react";

const sizes = variantValues(slider, "size");
const colors = variantValues(slider, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const marks = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];

export default function SliderPreview() {
  const [budget, setBudget] = useState([20, 70]);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Slider size={size} defaultValue={[40]} />
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <Slider color={color} defaultValue={[40]} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          labelled
        </p>
        <Slider label="Volume" showValue defaultValue={[65]} />
      </div>

      {/* Two values, one component: Ark renders a thumb per entry and the range between
          the outermost two, so nothing about the styling counts them. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          range
        </p>
        <Slider
          label={`Budget ${budget[0]} to ${budget[1]}`}
          color="success"
          value={budget}
          onValueChange={(details) => setBudget(details.value)}
          minStepsBetweenThumbs={5}
        />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          marks
        </p>
        <Slider label="Quality" marks={marks} step={25} defaultValue={[50]} />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          centred
        </p>
        <Slider label="Balance" origin="center" min={-50} max={50} defaultValue={[-20]} />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          disabled
        </p>
        <Slider label="Locked" defaultValue={[30]} disabled />
      </div>

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <div className="flex h-44 items-stretch gap-6">
          <Slider orientation="vertical" defaultValue={[40]} />
          <Slider orientation="vertical" color="warning" defaultValue={[70]} />
          <Slider orientation="vertical" color="error" defaultValue={[20, 80]} />
        </div>
      </div>
    </div>
  );
}
