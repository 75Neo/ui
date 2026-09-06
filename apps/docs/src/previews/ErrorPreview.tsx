import { TriangleAlert } from "lucide-react";
import { Button } from "@75neo/react/button";
import { Error } from "@75neo/react/error";

export function ErrorPreview() {
  return (
    <Error
      className="min-h-48 rounded-lg bg-muted"
      icon={<TriangleAlert />}
      statusCode={404}
      statusMessage="Page not found"
      message="The page you asked for is not here."
    >
      <Button variant="outline" color="neutral">
        Go back
      </Button>
    </Error>
  );
}
