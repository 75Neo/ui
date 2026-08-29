import preview from "../.storybook/preview";
import { Avatar, AvatarFallback, AvatarImage, AvatarRoot, Theme } from "@75neo/react";
import { User } from "lucide-react";
import { useState } from "react";

const meta = preview.meta({
  title: "Avatar",
  component: Avatar,
});

export const Default = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://github.com/nstcrystal.png" alt="Alex" fallback="AL" size="md" />
      <Avatar src="https://github.com/2giosangmitom.png" alt="Jamie" name="Jamie Doe" size="md" />
      <Avatar fallback="JD" size="md" />
    </div>
  ),
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="XS" size="xs" />
        <span className="text-muted text-xs">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="SM" size="sm" />
        <span className="text-muted text-xs">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="MD" size="md" />
        <span className="text-muted text-xs">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="LG" size="lg" />
        <span className="text-muted text-xs">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="XL" size="xl" />
        <span className="text-muted text-xs">xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="2XL" size="2xl" />
        <span className="text-muted text-xs">2xl</span>
      </div>
    </div>
  ),
});

export const Shapes = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="CN" shape="circle" size="lg" />
        <span className="text-muted text-xs">circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fallback="SQ" shape="square" size="lg" />
        <span className="text-muted text-xs">square</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://github.com/nstcrystal.png" alt="Shape" shape="square" size="lg" />
        <span className="text-muted text-xs">square + image</span>
      </div>
    </div>
  ),
});

export const Fallbacks = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar fallback="PA" size="md" />
        <Avatar name="Ada Lovelace" size="md" />
        <Avatar name="John" size="md" />
        <Avatar fallback={<User className="size-5" />} size="md" />
      </div>
      <p className="text-muted text-xs">
        Fallback supports initials via <code>fallback</code> or auto-derived from <code>name</code>,
        and custom ReactNode (e.g. icon).
      </p>
    </div>
  ),
});

export const WithImage = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://github.com/nstcrystal.png" alt="User 1" fallback="U1" size="md" />
      <Avatar src="https://github.com/2giosangmitom.png" alt="User 2" fallback="U2" size="lg" />
      <Avatar src="https://github.com/nstcrystal.png" alt="User 3" fallback="U3" size="xl" />
    </div>
  ),
});

export const BrokenImage = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Avatar src="https://invalid.example/broken.jpg" alt="Broken" fallback="FB" size="md" />
        <Avatar
          src="https://invalid.example/broken.jpg"
          alt="Broken"
          name="Fallback User"
          size="md"
        />
      </div>
      <p className="text-muted text-xs">When image fails to load, fallback is shown via Ark UI.</p>
    </div>
  ),
});

function StatusDemo() {
  const [status, setStatus] = useState("loading");
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <output className="text-sm">
        Status: <span className="font-mono font-semibold">{status}</span>
      </output>
      <div className="flex items-center gap-4">
        <Avatar
          key={key}
          src={
            key % 2 === 0
              ? "https://github.com/nstcrystal.png"
              : "https://github.com/2giosangmitom.png"
          }
          alt="Status"
          fallback="ST"
          onStatusChange={(e) => setStatus(e.status)}
          size="lg"
        />
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
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

export const Composition = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <AvatarRoot size="lg" shape="circle">
          <AvatarFallback>PA</AvatarFallback>
          <AvatarImage src="https://github.com/nstcrystal.png" alt="avatar" />
        </AvatarRoot>
        <AvatarRoot size="lg" shape="square">
          <AvatarFallback>
            <User className="size-6" />
          </AvatarFallback>
          <AvatarImage src="https://github.com/2giosangmitom.png" alt="avatar" />
        </AvatarRoot>
      </div>
      <p className="text-muted text-xs">Built from primitives for full customization.</p>
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar fallback="TH" size="lg" />
        <Theme
          ui={{
            avatar: {
              root: "ring-2 ring-primary ring-offset-2",
              fallback: "bg-primary text-white",
            },
          }}
        >
          <Avatar fallback="TH" size="lg" />
        </Theme>
        <Avatar
          fallback="TH"
          size="lg"
          ui={{ root: "ring-2 ring-success", fallback: "bg-success text-white" }}
        />
      </div>
      <p className="text-muted text-xs">
        Middle: themed via <code>Theme</code> provider, right: per-instance <code>ui</code> prop.
      </p>
    </div>
  ),
});

export const Group = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex -space-x-2">
        <Avatar fallback="AL" size="md" className="ring-2 ring-white" />
        <Avatar fallback="JD" size="md" className="ring-2 ring-white" />
        <Avatar
          src="https://github.com/nstcrystal.png"
          alt="G1"
          fallback="G1"
          size="md"
          className="ring-2 ring-white"
        />
        <Avatar
          src="https://github.com/2giosangmitom.png"
          alt="G2"
          fallback="G2"
          size="md"
          className="ring-2 ring-white"
        />
        <Avatar fallback="+3" size="md" className="bg-accented ring-2 ring-white" />
      </div>
      <p className="text-muted text-xs">Stack avatars with negative space for group display.</p>
    </div>
  ),
});

export const Matrix = meta.story({
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
    const shapes = ["circle", "square"] as const;
    return (
      <div className="flex flex-col gap-6">
        {shapes.map((shape) => (
          <div key={shape} className="flex flex-col gap-2">
            <h3 className="text-toned text-sm font-semibold capitalize">{shape}</h3>
            <div className="flex flex-wrap items-end gap-3">
              {sizes.map((size) => (
                <div key={`${shape}-${size}`} className="flex flex-col items-center gap-1">
                  <Avatar fallback={size.toUpperCase()} size={size} shape={shape} />
                  <span className="text-muted text-[10px]">{size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
});
