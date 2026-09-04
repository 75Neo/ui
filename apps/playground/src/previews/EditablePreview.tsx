import { useState } from "react";
import { editable, variantValues } from "@75neo/themes";
import { Editable } from "@75neo/react";

const sizes = variantValues(editable, "size");
const colors = variantValues(editable, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function EditablePreview() {
  const [text, setText] = useState("The controlled sentence");
  const [editing, setEditing] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Editable size={size} label="Project name" defaultValue="rings-of-power" />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the field's focus ring, so tab in to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <Editable color={accent} size="sm" defaultValue="Tab into this field" />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <Editable
          label="Double-click to edit"
          activationMode="dblclick"
          defaultValue="A single click only selects me"
        />
        <Editable
          label="Enter commits, blur reverts"
          submitMode="enter"
          defaultValue="Click away and I go back"
        />
        <Editable label="Read-only" readOnly defaultValue="You cannot change this" />
        <Editable label="Disabled" disabled defaultValue="Nor this" />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the text and the edit state both report back. */}
      <div className="flex flex-col gap-2">
        <Editable
          label="Controlled"
          value={text}
          onValueChange={(details: { value: string }) => setText(details.value)}
          edit={editing}
          onEditChange={(details: { edit: boolean }) => setEditing(details.edit)}
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <output className="font-mono text-sm text-toned">“{text}”</output>
          <button
            type="button"
            className="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
            onClick={() => setEditing((open) => !open)}
          >
            {editing ? "Stop editing" : "Start editing"}
          </button>
        </div>
      </div>
    </div>
  );
}
