import { ArrowRight, Check } from "lucide-react";
import { Button } from "@75neo/react";

/** Weight down the left, meaning across the top: the two variants are independent. */
export function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button leadingIcon={<Check />}>Save</Button>
      <Button variant="outline" color="neutral">
        Cancel
      </Button>
      <Button variant="soft" color="success" trailingIcon={<ArrowRight />}>
        Continue
      </Button>
      <Button variant="ghost" color="error">
        Delete
      </Button>
      <Button variant="subtle" color="warning" loading>
        Retrying
      </Button>
      <Button variant="link" color="info">
        Learn more
      </Button>
    </div>
  );
}
