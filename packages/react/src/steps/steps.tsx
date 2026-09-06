import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { Check } from "lucide-react";
import {
  cn,
  stepsDefaults,
  stepsSizeData,
  type StepsRootProps as StepsContract,
} from "@75neo/themes";
import { StepsVariantsContext, useStepsVariants } from "./variants";
import { StepsCompletedContent } from "./completed-content";
import { StepsContent } from "./content";
import { StepsIndicator } from "./indicator";
import { StepsItem } from "./item";
import { StepsList } from "./list";
import { StepsNextTrigger } from "./next-trigger";
import { StepsPrevTrigger } from "./prev-trigger";
import { StepsProgress } from "./progress";
import { StepsSeparator } from "./separator";
import { StepsTrigger } from "./trigger";

/**
 * Props for the Steps.
 *
 * @remarks
 * `dir` belongs to the locale provider.
 *
 * The step state comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type. The rows arrive as data and the count
 * follows from the array, so the two never drift.
 */
export interface StepsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "step" | "defaultStep" | "onStepChange" | "onStepComplete" | "ids"
    >,
    StepsContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function Steps({
  size,
  color,
  items,
  completedContent,
  linear,
  orientation,
  prevLabel = "Back",
  nextLabel = "Next",
  step,
  defaultStep,
  onStepChange,
  onStepComplete,
  ids,
  className,
  children,
  ...rest
}: StepsProps) {
  const resolved = {
    size: size ?? stepsDefaults.size,
    color: color ?? stepsDefaults.color,
  };

  return (
    <StepsVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        count={items.length}
        step={step}
        defaultStep={defaultStep}
        onStepChange={onStepChange}
        onStepComplete={onStepComplete}
        linear={linear}
        orientation={orientation}
        ids={ids}
        data-slot="steps"
        data-size={resolved.size}
        data-color={resolved.color}
        className={cn("flex w-full flex-col gap-4", className)}
      >
        <StepsList>
          {items.map((item, index) => (
            <StepsItem key={item.title} index={index}>
              <StepsTrigger>
                <StepsIndicator>
                  {item.icon ?? (
                    <>
                      <span
                        data-slot="steps-indicator-number"
                        className="group-data-complete/steps-indicator:hidden"
                      >
                        {index + 1}
                      </span>
                      <Check
                        data-slot="steps-indicator-check"
                        className="hidden size-[1em] group-data-complete/steps-indicator:inline-block"
                      />
                    </>
                  )}
                </StepsIndicator>
                <span
                  data-slot="steps-trigger-text"
                  className="flex min-w-0 flex-col items-start gap-0.5 text-start"
                >
                  <StepsTitle title={item.title} />
                  {item.description != null && <StepsDescription description={item.description} />}
                </span>
              </StepsTrigger>
              <StepsSeparator />
            </StepsItem>
          ))}
        </StepsList>
        <StepsProgress />
        {items.map((item, index) => (
          <StepsContent key={item.title} index={index}>
            {item.title}
            {item.description != null && ` — ${item.description}`}
          </StepsContent>
        ))}
        {completedContent != null && (
          <StepsCompletedContent>{completedContent}</StepsCompletedContent>
        )}
        <div data-slot="steps-actions" className="flex items-center justify-end gap-2">
          <StepsPrevTrigger>{prevLabel}</StepsPrevTrigger>
          <StepsNextTrigger>{nextLabel}</StepsNextTrigger>
        </div>
        {children}
      </Ark.Root>
    </StepsVariantsContext.Provider>
  );
}

function StepsTitle({ title }: { title: string }) {
  const variants = useStepsVariants();

  return (
    <span
      data-slot="steps-trigger-title"
      className={cn("font-medium text-highlighted", stepsSizeData.title[variants.size])}
    >
      {title}
    </span>
  );
}

function StepsDescription({ description }: { description: string }) {
  const variants = useStepsVariants();

  return (
    <span
      data-slot="steps-trigger-description"
      className={cn("text-dimmed", stepsSizeData.description[variants.size])}
    >
      {description}
    </span>
  );
}
