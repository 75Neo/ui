import { useEffect, useState } from "react";
import { progress, variantValues } from "@75neo/themes";
import { Progress } from "@75neo/react";

const sizes = variantValues(progress, "size");
const colors = variantValues(progress, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function ProgressPreview() {
  const [done, setDone] = useState(12);

  // A bar that moves, so the range's own transition can be seen doing it.
  useEffect(() => {
    const timer = setInterval(() => setDone((at) => (at >= 100 ? 0 : at + 11)), 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Progress size={size} defaultValue={62} />
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <Progress color={color} defaultValue={62} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          labelled
        </p>
        <Progress label="Uploading" showValue defaultValue={45} />
      </div>

      {/* Null is the indeterminate state: nothing to measure, so the range sweeps. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          indeterminate
        </p>
        <Progress label="Working" value={null} />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          moving
        </p>
        <Progress label="Restoring" showValue value={done} color="success" />
      </div>

      {/* Ark writes out how far along the bar is, not the raw number, so a `max`
          other than a hundred still reads as a percentage. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          out of twelve
        </p>
        <Progress label="Step 7 of 12" showValue value={7} max={12} color="info" />
      </div>

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <div className="flex h-40 items-stretch gap-4">
          <Progress orientation="vertical" defaultValue={62} />
          <Progress orientation="vertical" color="warning" defaultValue={28} />
          <Progress orientation="vertical" color="error" value={null} />
        </div>
      </div>
    </div>
  );
}
