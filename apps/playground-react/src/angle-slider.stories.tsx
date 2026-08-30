import preview from "../.storybook/preview";
import { AngleSlider, Theme } from "@75neo/react";
import { useState } from "react";

const meta = preview.meta({
  title: "AngleSlider",
  component: AngleSlider,
});

const denseMarkers = Array.from({ length: 12 }, (_, i) => i * 30);

export const Default = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <AngleSlider label="Rotation" defaultValue={45} />
    </div>
  ),
});

function ControlledDemo() {
  const [value, setValue] = useState(90);
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <AngleSlider label="Rotation" value={value} onValueChange={(e) => setValue(e.value)} />
      <div className="text-muted text-sm">
        Value: <span className="text-default font-mono font-semibold">{value}°</span>
        <button
          type="button"
          onClick={() => setValue((v) => (v + 45) % 360)}
          className="bg-muted hover:bg-accented ml-3 rounded px-2 py-1 text-xs"
        >
          +45°
        </button>
        <button
          type="button"
          onClick={() => setValue(0)}
          className="bg-muted hover:bg-accented ml-1 rounded px-2 py-1 text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export const Controlled = meta.story({
  render: () => <ControlledDemo />,
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-end gap-8 py-8">
      <AngleSlider size="sm" label="Small" defaultValue={30} />
      <AngleSlider size="md" label="Medium" defaultValue={30} />
      <AngleSlider size="lg" label="Large" defaultValue={30} />
    </div>
  ),
});

export const Markers = meta.story({
  render: () => (
    <div className="flex items-center gap-8 py-8">
      <AngleSlider label="No markers" defaultValue={75} markers={[]} />
      <AngleSlider label="Custom" defaultValue={90} markers={[0, 90, 180, 270]} />
      <AngleSlider label="Dense" defaultValue={45} markers={denseMarkers} />
    </div>
  ),
});

export const States = meta.story({
  render: () => (
    <div className="flex items-center gap-8 py-8">
      <AngleSlider label="Disabled" defaultValue={120} disabled />
      <AngleSlider label="Read only" defaultValue={200} readOnly />
      <AngleSlider label="Invalid" defaultValue={10} invalid />
    </div>
  ),
});

export const Slots = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <AngleSlider
        defaultValue={90}
        size="lg"
        markers={[0, 90, 180, 270]}
        label={<span className="text-primary">Custom label slot</span>}
        valueText={({ value }) => <span className="tabular-nums">{value}° rotation</span>}
      />
      <p className="text-muted text-xs">
        <code>label</code> and <code>valueText</code> render props — <code>valueText</code> receives{" "}
        <code>{"{ value, valueAsDegree }"}</code>
      </p>
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-4 py-8">
      <AngleSlider label="Default" defaultValue={45} />
      <Theme ui={{ "angle-slider": { control: "ring-2 ring-primary", thumb: "bg-primary" } }}>
        <AngleSlider label="Themed" defaultValue={45} />
      </Theme>
    </div>
  ),
});
