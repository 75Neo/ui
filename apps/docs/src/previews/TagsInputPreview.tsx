import { TagsInput } from "@75neo/react/tags-input";

export function TagsInputPreview() {
  return (
    <div className="max-w-xs">
      <TagsInput label="Tags" defaultValue={["react", "vue"]} />
    </div>
  );
}
