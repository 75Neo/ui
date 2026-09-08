import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsSeparator,
  StepsTrigger,
} from "@/components/react";

const stages = [
  { title: "Register", body: "Add the registry to your components.json." },
  { title: "Install", body: "Run add with the item name you want." },
  { title: "Theme", body: "Import the stylesheet the CLI wrote to your project root." },
];

export default function StepsOverview() {
  return (
    <Steps count={stages.length} className="w-full">
      <StepsList>
        {stages.map((stage, index) => (
          <StepsItem key={stage.title} index={index}>
            <StepsTrigger>
              <StepsIndicator>{index + 1}</StepsIndicator>
              {stage.title}
            </StepsTrigger>
            {index < stages.length - 1 && <StepsSeparator />}
          </StepsItem>
        ))}
      </StepsList>

      {stages.map((stage, index) => (
        <StepsContent key={stage.title} index={index}>
          {stage.body}
        </StepsContent>
      ))}
      <StepsCompletedContent>Everything is in place.</StepsCompletedContent>

      <div className="flex gap-2">
        <StepsPrevTrigger>Back</StepsPrevTrigger>
        <StepsNextTrigger>Next</StepsNextTrigger>
      </div>
    </Steps>
  );
}
