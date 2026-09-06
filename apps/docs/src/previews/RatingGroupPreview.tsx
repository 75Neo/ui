import { RatingGroup } from "@75neo/react/rating-group";

export function RatingGroupPreview() {
  return (
    <div className="max-w-xs">
      <RatingGroup label="Quality" defaultValue={3} />
    </div>
  );
}
