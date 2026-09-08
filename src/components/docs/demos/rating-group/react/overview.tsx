import { Star } from "lucide-react";
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupLabel,
} from "@/components/react";

export default function RatingGroupOverview() {
  return (
    <RatingGroup defaultValue={4} count={5}>
      <RatingGroupLabel>How did the install go?</RatingGroupLabel>
      <RatingGroupControl>
        {[0, 1, 2, 3, 4].map((index) => (
          <RatingGroupItem key={index} index={index}>
            <Star fill="currentColor" />
          </RatingGroupItem>
        ))}
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
  );
}
