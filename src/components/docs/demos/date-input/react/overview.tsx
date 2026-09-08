import { DateInputContext } from "@ark-ui/react/date-input";
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentGroup,
} from "@/components/react";

export default function DateInputOverview() {
  return (
    <div className="max-w-56">
      <DateInput>
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl>
          <DateInputSegmentGroup>
            <DateInputContext>
              {(dateInput) =>
                dateInput.getSegments().map((segment, index) => (
                  <DateInputSegment key={index} segment={segment}>
                    {segment.text}
                  </DateInputSegment>
                ))
              }
            </DateInputContext>
          </DateInputSegmentGroup>
        </DateInputControl>
        <DateInputHiddenInput />
      </DateInput>
    </div>
  );
}
