import { useState } from "react";
import { passwordInput, variantValues } from "@75neo/themes";
import { PasswordInput } from "@75neo/react";
import { Lock } from "lucide-react";

const sizes = variantValues(passwordInput, "size");
const colors = variantValues(passwordInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function PasswordInputPreview() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <PasswordInput
            size={size}
            label="Password"
            placeholder="hunter2"
            leadingIcon={<Lock />}
            defaultVisible={size === "lg"}
          />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the focus ring, so tab in to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <PasswordInput color={accent} size="sm" placeholder="hunter2" />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <PasswordInput
          label="New password"
          placeholder="Something memorable"
          autoComplete="new-password"
        />
        <PasswordInput label="Invalid" placeholder="hunter2" invalid />
        <PasswordInput label="Read-only" placeholder="hunter2" readOnly />
        <PasswordInput label="Disabled" placeholder="hunter2" disabled />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the eye reports back, and the link below drives it. */}
      <div className="flex flex-col gap-2">
        <PasswordInput
          label="Controlled"
          placeholder="hunter2"
          visible={visible}
          onVisibilityChange={(details: { visible: boolean }) => setVisible(details.visible)}
        />
        <button
          type="button"
          className="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setVisible((shown) => !shown)}
        >
          {visible ? "Hide it again" : "Show it from out here"}
        </button>
      </div>
    </div>
  );
}
