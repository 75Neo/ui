import { TriangleAlert } from "lucide-react";
import { Button, Error } from "@75neo/react";

export function ErrorPreview() {
  return (
    <div className="overflow-hidden rounded-lg ring ring-default">
      <Error
        ui={{ base: "min-h-56 py-8" }}
        icon={<TriangleAlert />}
        statusCode={404}
        statusMessage="Page not found"
        message="Nothing answers at that address. It may have moved, or never existed."
      >
        <Button>Back to home</Button>
        <Button variant="outline" color="neutral">
          Search the docs
        </Button>
      </Error>
    </div>
  );
}
