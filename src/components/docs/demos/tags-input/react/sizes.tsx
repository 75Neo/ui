import { TagsInputContext } from "@ark-ui/react/tags-input";
import {
  TagsInput,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
} from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function TagsInputSizes() {
  return (
    <div className="flex max-w-md flex-col gap-5">
      {sizes.map((size) => (
        <TagsInput key={size} size={size} defaultValue={["button", "table"]}>
          <TagsInputLabel>{size}</TagsInputLabel>
          <TagsInputControl>
            <TagsInputContext>
              {(tags) =>
                tags.value.map((value, index) => (
                  <TagsInputItem key={value} index={index} value={value}>
                    <TagsInputItemPreview>
                      <TagsInputItemText>{value}</TagsInputItemText>
                    </TagsInputItemPreview>
                  </TagsInputItem>
                ))
              }
            </TagsInputContext>
            <TagsInputInput placeholder="Add an item" />
          </TagsInputControl>
        </TagsInput>
      ))}
    </div>
  );
}
