---
title: Steps
description: A numbered sequence that tracks which stage the person is on.
category: Navigation
registryItem: steps
---

## Installation

```sh
npx shadcn@latest add @75neo/steps
```

```sh
npx shadcn-vue@latest add @75neo/steps
```

## Usage

```vue
<template>
  <Steps :count="stages.length">
    <StepsList>
      <StepsItem v-for="(stage, index) in stages" :key="stage.title" :index="index">
        <StepsTrigger>
          <StepsIndicator>{{ index + 1 }}</StepsIndicator>
          {{ stage.title }}
        </StepsTrigger>
        <StepsSeparator v-if="index < stages.length - 1" />
      </StepsItem>
    </StepsList>

    <StepsContent v-for="(stage, index) in stages" :key="stage.title" :index="index">
      {{ stage.body }}
    </StepsContent>
    <StepsCompletedContent>Everything is in place.</StepsCompletedContent>

    <StepsPrevTrigger>Back</StepsPrevTrigger>
    <StepsNextTrigger>Next</StepsNextTrigger>
  </Steps>
</template>
```

`count` has to match the number of items, because the machine uses it to know when the sequence is
finished and to swap in the completed content.

## Linear or free

`linear` stops someone jumping ahead to a stage they have not reached. Leave it off when the stages
are independent and the person may want to review one they already passed.

`isStepValid` gates moving forward per index, which is where a form validation result belongs.
`isStepSkippable` marks a stage as optional.

## The indicator

Each indicator reports `data-complete`, `data-current` or `data-incomplete`, so a number, a tick
and a hollow circle are three cases of one element rather than three components. The separator
reads the same state and fills in behind the stages already done.

## Orientation

`orientation="vertical"` turns the list into a column beside the content and the separators into
short vertical rules. Worth it when the stage titles are long enough to wrap horizontally.
