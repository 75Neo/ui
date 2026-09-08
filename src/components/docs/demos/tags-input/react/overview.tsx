import { TagsInputContext } from "@ark-ui/react/tags-input";
import { X } from "lucide-react";
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
} from "@/components/react";

export default function TagsInputOverview() {
  return (
    <div className="max-w-md">
      <TagsInput editable defaultValue={["button", "table", "toc"]}>
        <TagsInputControl>
          <TagsInputContext>
            {(tags) =>
              tags.value.map((value, index) => (
                <TagsInputItem key={value} index={index} value={value}>
                  <TagsInputItemPreview>
                    <TagsInputItemText>{value}</TagsInputItemText>
                    <TagsInputItemDeleteTrigger aria-label="Remove">
                      <X />
                    </TagsInputItemDeleteTrigger>
                  </TagsInputItemPreview>
                  <TagsInputItemInput />
                </TagsInputItem>
              ))
            }
          </TagsInputContext>

          <TagsInputInput placeholder="Add an item" />
          <TagsInputClearTrigger aria-label="Clear">
            <X />
          </TagsInputClearTrigger>
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
    </div>
  );
}
