import { Progress } from "@75neo/react";

export function ProgressPreview() {
  return (
    <div className="flex flex-col gap-6">
      <Progress label="Uploading" showValue defaultValue={45} />
      <Progress label="Working" value={null} color="secondary" />
      <Progress size="lg" color="success" defaultValue={100} />
    </div>
  );
}
