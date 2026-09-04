import type React from "react";
import { Steps as Ark, type StepsRootProps } from "@ark-ui/react/steps";
import { steps, type StepsItem, type StepsProps as StepsContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Steps.
 *
 * @remarks
 * The current step comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 *
 * A step's panel is the `content` string on its item, and anything richer goes
 * through `renderContent`. The Tabs take panels the same way.
 */
export interface StepsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir">,
    Pick<
      StepsRootProps,
      "step" | "defaultStep" | "onStepChange" | "onStepComplete" | "onStepInvalid" | "ids"
    >,
    StepsContract {
  /** Renders a step's panel. Falls back to the item's `content` string. */
  renderContent?: (item: StepsItem, index: number) => React.ReactNode;
  /** Renders the completion panel. Falls back to `completedContent`. */
  renderCompletedContent?: () => React.ReactNode;
}

export function Steps({
  ui,
  color,
  size,
  items,
  orientation,
  linear,
  prevLabel = "Back",
  nextLabel = "Next",
  completedContent,
  step,
  defaultStep,
  onStepChange,
  onStepComplete,
  onStepInvalid,
  ids,
  renderContent,
  renderCompletedContent,
  className,
  ...rest
}: StepsProps) {
  const theme = useResolvedTheme(steps, "steps", { ui, color, size }, className);

  const completed = renderCompletedContent?.() ?? completedContent;

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      count={items.length}
      orientation={orientation}
      linear={linear}
      step={step}
      defaultStep={defaultStep}
      onStepChange={onStepChange}
      onStepComplete={onStepComplete}
      onStepInvalid={onStepInvalid}
      ids={ids}
    >
      <Ark.List data-slot="list" className={theme.class.list}>
        {items.map((item, index) => (
          <Ark.Item key={index} index={index} data-slot="item" className={theme.class.item}>
            <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
              <Ark.Indicator data-slot="indicator" className={theme.class.indicator}>
                {index + 1}
              </Ark.Indicator>
              <span data-slot="wrapper" className={theme.class.wrapper}>
                <span data-slot="title" className={theme.class.title}>
                  {item.title}
                </span>
                {item.description != null && (
                  <span data-slot="description" className={theme.class.description}>
                    {item.description}
                  </span>
                )}
              </span>
            </Ark.Trigger>
            {index < items.length - 1 && (
              <Ark.Separator data-slot="separator" className={theme.class.separator} />
            )}
          </Ark.Item>
        ))}
      </Ark.List>

      {items.map((item, index) => {
        const content = renderContent?.(item, index) ?? item.content;
        return (
          content != null && (
            <Ark.Content
              key={index}
              index={index}
              data-slot="content"
              className={theme.class.content}
            >
              {content}
            </Ark.Content>
          )
        );
      })}

      {completed != null && (
        <Ark.CompletedContent data-slot="completedContent" className={theme.class.completedContent}>
          {completed}
        </Ark.CompletedContent>
      )}

      <div data-slot="actions" className={theme.class.actions}>
        <Ark.PrevTrigger data-slot="prevTrigger" className={theme.class.prevTrigger}>
          {prevLabel}
        </Ark.PrevTrigger>
        <Ark.NextTrigger data-slot="nextTrigger" className={theme.class.nextTrigger}>
          {nextLabel}
        </Ark.NextTrigger>
      </div>
    </Ark.Root>
  );
}
