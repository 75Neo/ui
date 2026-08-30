import preview from "../.storybook/preview";
import { Avatar, Theme } from "@75neo/react";
import { User } from "lucide-react";
import { useState } from "react";

const meta = preview.meta({
  title: "Avatar",
  component: Avatar,
});

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const colors = ["neutral", "primary", "secondary", "success", "info", "warning", "error"] as const;

export const Default = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://github.com/nstcrystal.png" alt="Alex" text="AL" size="md" />
      <Avatar text="JD" size="md" />
      <Avatar icon={<User className="size-5" />} size="md" />
    </div>
  ),
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Avatar text={s.toUpperCase()} size={s} />
          <span className="text-muted text-xs">{s}</span>
        </div>
      ))}
    </div>
  ),
});

export const Colors = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((c) => (
        <div key={c} className="flex flex-col items-center gap-2">
          <Avatar text={c.slice(0, 2).toUpperCase()} color={c} size="lg" />
          <span className="text-muted text-xs">{c}</span>
        </div>
      ))}
    </div>
  ),
});

export const Shapes = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar text="CN" shape="circle" size="lg" />
      <Avatar text="SQ" shape="square" size="lg" />
      <Avatar src="https://github.com/nstcrystal.png" alt="Shape" shape="square" size="lg" />
    </div>
  ),
});

export const Fallbacks = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar text="PA" size="md" />
        <Avatar alt="Ada Lovelace" size="md" />
        <Avatar text="AB" size="md" color="primary" />
        <Avatar fallback={<User className="size-5" />} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar src="https://github.com/nstcrystal.png" alt="User" text="U1" size="md" />
        <Avatar src="https://invalid.example/broken.jpg" alt="Broken" text="FB" size="md" />
      </div>
      <p className="text-muted text-xs">
        Fallback via <code>text</code>, initials derived from <code>alt</code>, or the{" "}
        <code>fallback</code> slot; broken image shows fallback.
      </p>
    </div>
  ),
});

function StatusDemo() {
  const [status, setStatus] = useState("loading");
  const [src, setSrc] = useState("https://github.com/nstcrystal.png");
  return (
    <div className="flex flex-col gap-3">
      <output className="text-sm">
        Status: <span className="font-mono font-semibold">{status}</span>
      </output>
      <div className="flex items-center gap-4">
        <Avatar
          src={src}
          alt="Status"
          text="ST"
          onStatusChange={(e) => setStatus(e.status)}
          size="lg"
        />
        <button
          type="button"
          onClick={() =>
            setSrc((s) =>
              s.includes("nstcrystal")
                ? "https://github.com/2giosangmitom.png"
                : "https://github.com/nstcrystal.png",
            )
          }
          className="bg-muted hover:bg-accented rounded px-2 py-1 text-xs"
        >
          Change src
        </button>
      </div>
    </div>
  );
}

export const WithStatus = meta.story({
  render: () => <StatusDemo />,
});

export const Slots = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Avatar size="lg" color="primary" src="https://github.com/nstcrystal.png" alt="Pham An" />
        <Avatar size="lg" shape="square" icon={<User className="size-6" />} />
        <Avatar
          size="lg"
          color="info"
          alt="Vo Quang Chien"
          fallback={({ initials }) => <span className="text-xs">{initials}</span>}
        />
      </div>
      <p className="text-muted text-xs">
        <code>icon</code> and <code>fallback</code> render props — <code>fallback</code> receives{" "}
        <code>{"{ initials }"}</code>
      </p>
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar text="TH" size="lg" />
      <Theme
        ui={{
          avatar: { root: "ring-2 ring-primary ring-offset-2", fallback: "bg-primary text-white" },
        }}
      >
        <Avatar text="TH" size="lg" />
      </Theme>
      <Avatar
        text="TH"
        size="lg"
        ui={{ root: "ring-2 ring-success", fallback: "bg-success text-white" }}
      />
    </div>
  ),
});

export const Group = meta.story({
  render: () => (
    <div className="flex -space-x-2">
      <Avatar text="AL" size="md" className="ring-2 ring-white" />
      <Avatar text="JD" size="md" className="ring-2 ring-white" />
      <Avatar
        src="https://github.com/nstcrystal.png"
        alt="G1"
        text="G1"
        size="md"
        className="ring-2 ring-white"
      />
      <Avatar text="+3" size="md" className="bg-accented ring-2 ring-white" />
    </div>
  ),
});

export const Matrix = meta.story({
  render: () => (
    <div className="flex flex-col gap-6">
      {(["circle", "square"] as const).map((shape) => (
        <div key={shape} className="flex flex-col gap-2">
          <h3 className="text-toned text-sm font-semibold capitalize">{shape}</h3>
          <div className="flex flex-wrap items-end gap-3">
            {sizes.map((size) => (
              <div key={`${shape}-${size}`} className="flex flex-col items-center gap-1">
                <Avatar text={size.toUpperCase()} size={size} shape={shape} />
                <span className="text-muted text-[10px]">{size}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
});
