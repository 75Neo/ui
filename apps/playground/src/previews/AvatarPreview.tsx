import type { ReactNode } from "react";
import { User } from "lucide-react";
import { avatar, variantValues } from "@75neo/themes";
import { Avatar } from "@75neo/react";

const sizes = variantValues(avatar, "size");
const shapes = variantValues(avatar, "shape");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const rowItems = "flex flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

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

function MockNextImage({
  src,
  alt,
  className,
  style,
  width,
  height,
  ...rest
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  [key: string]: unknown;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      data-mock="next-image"
      {...(rest as Record<string, unknown>)}
    />
  );
}

export default function AvatarPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {shapes.map((shape) => (
          <Row key={shape} label={shape}>
            {sizes.map((size) => (
              <Avatar
                key={`${shape}-${size}`}
                fallback={size.toUpperCase()}
                size={size}
                shape={shape}
              />
            ))}
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="fallback">
          <Avatar fallback="PA" size="md" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="John" size="md" />
          <Avatar fallback={<User className="size-5" />} size="md" />
        </Row>

        <Row label="image">
          <Avatar src="https://github.com/nstcrystal.png" alt="User 1" fallback="U1" size="md" />
          <Avatar src="https://github.com/2giosangmitom.png" alt="User 2" fallback="U2" size="lg" />
          <Avatar src="https://github.com/nstcrystal.png" alt="User 3" fallback="U3" size="xl" />
        </Row>

        <Row label="broken">
          <Avatar src="https://invalid.example/broken.jpg" alt="Broken" fallback="FB" size="md" />
          <Avatar
            src="https://invalid.example/broken.jpg"
            alt="Broken"
            name="Fallback User"
            size="md"
          />
        </Row>

        <Row label="custom">
          <Avatar
            src="https://github.com/nstcrystal.png"
            alt="Custom image"
            fallback="CI"
            size="lg"
            renderImage={({ src, alt, className, hidden, props }) => (
              <MockNextImage
                src={src}
                alt={alt}
                width={80}
                height={80}
                className={className}
                style={{
                  ...(props.style as React.CSSProperties | undefined),
                  visibility: hidden ? "hidden" : "visible",
                }}
                {...props}
                data-slot="image"
              />
            )}
          />
          <span className="text-xs text-muted">via renderImage (e.g. NextImage)</span>
        </Row>

        <Row label="group">
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
            <Avatar fallback="+3" size="md" className="border-2 border-white" />
          </div>
        </Row>
      </div>
    </div>
  );
}
