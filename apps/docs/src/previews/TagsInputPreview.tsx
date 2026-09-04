import { TagsInput } from "@75neo/react";

export function TagsInputPreview() {
  return (
    <TagsInput label="Topics" defaultValue={["design", "typography"]} placeholder="Add a tag" />
  );
}
