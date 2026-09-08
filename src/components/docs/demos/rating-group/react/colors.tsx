import { Star } from "lucide-react";
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupLabel,
} from "@/components/react";

const colors = ["warning", "primary", "success", "error"] as const;

export default function RatingGroupColors() {
  return (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <RatingGroup key={color} color={color} defaultValue={4} count={5}>
          <RatingGroupLabel>{color}</RatingGroupLabel>
          <RatingGroupControl>
            {[0, 1, 2, 3, 4].map((index) => (
              <RatingGroupItem key={index} index={index}>
                <Star fill="currentColor" />
              </RatingGroupItem>
            ))}
          </RatingGroupControl>
        </RatingGroup>
      ))}
    </div>
  );
}
