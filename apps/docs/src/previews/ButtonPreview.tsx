import { Button } from "@75neo/react/button";

export function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="solid" color="primary">
        Save
      </Button>
      <Button variant="outline" color="neutral">
        Cancel
      </Button>
      <Button variant="ghost" color="error">
        Delete
      </Button>
    </div>
  );
}
