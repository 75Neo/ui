import preview from "../.storybook/preview";
import {
  AngleSlider,
  AngleSliderRoot,
  AngleSliderLabel,
  AngleSliderControl,
  AngleSliderThumb,
  AngleSliderMarkerGroup,
  AngleSliderMarker,
  AngleSliderValueText,
  AngleSliderHiddenInput,
} from "@75neo/react";
import { useState } from "react";

const meta = preview.meta({
  title: "AngleSlider",
  component: AngleSlider,
});

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
      <div className="flex flex-col items-center gap-2">
        <AngleSlider size="sm" label="Small" defaultValue={30} />
        <span className="text-muted text-xs">sm — 80px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AngleSlider size="md" label="Medium" defaultValue={30} />
        <span className="text-muted text-xs">md — 100px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AngleSlider size="lg" label="Large" defaultValue={30} />
        <span className="text-muted text-xs">lg — 140px</span>
      </div>
    </div>
  ),
});

export const Steps = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="flex flex-wrap items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <AngleSlider label="Step 1°" step={1} defaultValue={33} />
          <span className="text-muted text-xs">step=1</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AngleSlider label="Step 15°" step={15} defaultValue={30} />
          <span className="text-muted text-xs">step=15</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AngleSlider label="Step 45°" step={45} defaultValue={90} />
          <span className="text-muted text-xs">step=45</span>
        </div>
      </div>
      <p className="text-muted text-xs">Try dragging — thumb snaps to step increments.</p>
    </div>
  ),
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex items-center gap-8 py-8">
      <AngleSlider label="Disabled" defaultValue={120} disabled />
      <AngleSlider label="Active" defaultValue={120} />
    </div>
  ),
});

export const ReadOnly = meta.story({
  render: () => (
    <div className="flex items-center gap-8 py-8">
      <AngleSlider label="Read only" defaultValue={200} readOnly />
      <span className="text-muted text-sm">Value is fixed — dragging is blocked</span>
    </div>
  ),
});

export const WithoutMarkers = meta.story({
  render: () => (
    <div className="flex items-center gap-8 py-8">
      <AngleSlider label="No markers" defaultValue={75} markers={[]} />
      <AngleSlider label="Custom markers" defaultValue={90} markers={[0, 90, 180, 270]} />
      <AngleSlider
        label="Dense markers"
        defaultValue={45}
        markers={Array.from({ length: 12 }, (_, i) => i * 30)}
      />
    </div>
  ),
});

export const WithoutValueText = meta.story({
  render: () => (
    <div className="flex items-center gap-8 py-8">
      <AngleSlider label="With value" defaultValue={60} showValueText />
      <AngleSlider label="Hidden value" defaultValue={60} showValueText={false} />
    </div>
  ),
});

export const Invalid = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-4 py-8">
      <AngleSlider label="Invalid" defaultValue={10} invalid />
      <span className="text-error text-xs">Use `invalid` to indicate validation error</span>
    </div>
  ),
});

export const WithForm = meta.story({
  render: () => (
    <form
      className="flex flex-col items-center gap-4 py-8"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        alert(`Submitted value: ${data.get("angle") ?? "(empty)"}`);
      }}
    >
      <AngleSlider label="Angle (form)" name="angle" defaultValue={45} />
      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 rounded-md px-4 py-1.5 text-sm font-medium text-white"
      >
        Submit
      </button>
      <span className="text-muted text-xs">
        Hidden input `name="angle"` is submitted with the form
      </span>
    </form>
  ),
});

export const Composition = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-2 py-8">
      <AngleSliderRoot
        defaultValue={135}
        size="lg"
        onValueChange={(details) => console.log("valueChange", details)}
        className="gap-4"
      >
        <AngleSliderLabel className="text-muted text-xs tracking-widest uppercase">
          Composition API
        </AngleSliderLabel>
        <AngleSliderControl>
          <AngleSliderMarkerGroup>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((v) => (
              <AngleSliderMarker key={v} value={v} />
            ))}
          </AngleSliderMarkerGroup>
          <AngleSliderThumb />
        </AngleSliderControl>
        <AngleSliderValueText className="font-mono text-2xl" />
        <AngleSliderHiddenInput />
      </AngleSliderRoot>
      <span className="text-muted text-xs">Built from primitives for full customization</span>
    </div>
  ),
});

function PlaygroundDemo() {
  const [value, setValue] = useState(45);
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-8">
      <AngleSlider
        label="Playground"
        value={value}
        onValueChange={(e) => setValue(e.value)}
        step={step}
        size={size}
        disabled={disabled}
      />
      <div className="border-default w-full space-y-3 rounded-lg border p-4">
        <div className="flex items-center justify-between gap-4">
          <label className="text-sm font-medium">Value: {value}°</label>
          <input
            type="range"
            min={0}
            max={360}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="accent-primary flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Step</label>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="border-default bg-default rounded border px-2 py-1 text-sm"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={15}>15</option>
            <option value={45}>45</option>
          </select>
          <label className="ml-4 text-sm">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as never)}
            className="border-default bg-default rounded border px-2 py-1 text-sm"
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
          <label className="ml-auto flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            Disabled
          </label>
        </div>
      </div>
    </div>
  );
}

export const Playground = meta.story({
  render: () => <PlaygroundDemo />,
});
