import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@75neo/react/avatar";
import { avatarSchema } from "@75neo/themes";

const sizes = avatarSchema.size.values;
const colors = avatarSchema.color.values;
const shapes = avatarSchema.shape.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
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

export default function AvatarPreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="sizes">
          {sizes.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarFallback name="Ada Lovelace" />
            </Avatar>
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Avatar key={color} color={color}>
              <AvatarFallback name="Ada Lovelace" />
            </Avatar>
          ))}
        </Row>

        <Row label="shapes">
          {shapes.map((shape) => (
            <Avatar key={shape} shape={shape} color="primary">
              <AvatarFallback name="Grace Hopper" />
            </Avatar>
          ))}
        </Row>

        <Row label="image">
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Ada Lovelace" />
            <AvatarFallback name="Ada Lovelace" />
          </Avatar>
          <Avatar size="lg" shape="square">
            <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="Grace Hopper" />
            <AvatarFallback name="Grace Hopper" />
          </Avatar>
        </Row>

        <Row label="fallback">
          <Avatar>
            <AvatarFallback name="Ada" />
          </Avatar>
          <Avatar color="warning">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </Row>
      </div>
    </div>
  );
}
