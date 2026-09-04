import { useState } from "react";
import { Heart } from "lucide-react";
import { ratingGroup, variantValues } from "@75neo/themes";
import { RatingGroup } from "@75neo/react";

const sizes = variantValues(ratingGroup, "size");
const colors = variantValues(ratingGroup, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function RatingGroupPreview() {
  const [score, setScore] = useState(3);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <RatingGroup size={size} defaultValue={3} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent fills a star. Amber is the default, because a reader knows what an
          amber star means before reading a word. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <RatingGroup color={accent} size="sm" defaultValue={4} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        {/* A half star is the same shape cut down the middle, not a second icon. */}
        <RatingGroup label="Half stars" allowHalf defaultValue={3.5} />
        <RatingGroup label="Ten of them" count={10} defaultValue={7} />
        <RatingGroup label="Hearts" icon={<Heart />} color="error" defaultValue={4} />
        <RatingGroup label="Read only" readOnly defaultValue={4} allowHalf />
        <RatingGroup label="Disabled" disabled defaultValue={2} />
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-center gap-4">
        <RatingGroup
          label="Controlled"
          allowHalf
          value={score}
          onValueChange={(details: { value: number }) => setScore(details.value)}
        />
        <output className="font-mono text-sm text-toned">{score}</output>
      </div>
    </div>
  );
}
