import {
  Button,
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from "@/components/react";

export default function TooltipOverview() {
  return (
    <div className="flex justify-center py-6">
      <Tooltip openDelay={200}>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover or focus me</Button>
        </TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent>
            <TooltipArrow>
              <TooltipArrowTip />
            </TooltipArrow>
            Overwrites the file on the next install
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    </div>
  );
}
