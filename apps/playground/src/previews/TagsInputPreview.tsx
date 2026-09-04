import { useState } from "react";
import { tagsInput, variantValues } from "@75neo/themes";
import { TagsInput } from "@75neo/react";

const sizes = variantValues(tagsInput, "size");
const colors = variantValues(tagsInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const starting = ["design", "typography"];

export default function TagsInputPreview() {
  const [tags, setTags] = useState<string[]>(["rust", "wasm"]);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <TagsInput size={size} defaultValue={starting} placeholder="Add a tag" />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the focus ring and a tag under the arrow keys, so click in
          and press the left arrow to see the second one. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <TagsInput color={accent} size="sm" defaultValue={starting} placeholder="Add a tag" />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <TagsInput label="Three at most" max={3} defaultValue={starting} />
        <TagsInput
          label="Past the limit is invalid"
          max={2}
          allowOverflow
          defaultValue={["one", "two", "three"]}
        />
        <TagsInput label="Duplicates welcome" allowDuplicates defaultValue={["same", "same"]} />
        <TagsInput label="Paste splits on the comma" addOnPaste placeholder="Paste a,b,c" />
        <TagsInput label="Fixed once made" editable={false} defaultValue={starting} />
        <TagsInput
          label="Only lowercase"
          validate={(details) => details.inputValue === details.inputValue.toLowerCase()}
          placeholder="Try an Uppercase one"
        />
        <TagsInput label="Read only" readOnly defaultValue={starting} />
        <TagsInput label="Disabled" disabled defaultValue={starting} />
      </div>

      <hr className="border-muted" />

      {/* Controlled. Double-click a tag to rewrite it in place. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
        <TagsInput
          label="Controlled"
          value={tags}
          onValueChange={(details: { value: string[] }) => setTags(details.value)}
        />
        <output className="font-mono text-sm text-toned">[{tags.join(", ")}]</output>
      </div>
    </div>
  );
}
