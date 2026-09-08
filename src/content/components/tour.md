---
title: Tour
description: A guided walk through a page, one spotlit step at a time.
category: Overlays
registryItem: tour
---

## Usage

The steps are data. Each one names a target, the copy to show, and the actions at the bottom.

```ts
const steps: StepDetails[] = [
  {
    id: "start",
    type: "dialog",
    title: "A guided walk",
    description: "Three steps, each anchored to something on the page.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "trigger",
    type: "tooltip",
    target: () => document.querySelector("[data-tour-target]"),
    title: "The trigger",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
];
```

The root takes a tour instance rather than the steps, so the same instance can be started from
anywhere in the tree.

```ts
const tour = useTour({ steps });
```

```vue
<template>
  <Tour :tour="tour">
    <TourBackdrop />
    <TourSpotlight />
    <TourPositioner>
      <TourContent>
        <TourTitle />
        <TourDescription />
        <TourControl>
          <TourProgressText />
          <TourActions v-slot="{ actions }">
            <TourActionTrigger v-for="action in actions" :key="action.label" :action="action" />
          </TourActions>
        </TourControl>
      </TourContent>
    </TourPositioner>
  </Tour>
</template>
```

The title, the description, the progress text and the action triggers print their own content from
the step, so they render as void elements rather than taking children.

## Step types

`dialog` centres the step with no target, which suits the opening and closing ones. `tooltip`
anchors it to an element and cuts a hole in the backdrop around it. `floating` positions it in a
corner without a target.

## Targets are functions

A target is a function returning an element, not an element, so the step can be defined before the
page has rendered and re-resolved if the layout moves. Return null and the step is skipped rather
than pointing at nothing.

## Interaction

`preventInteraction` stops clicks reaching the page underneath, which keeps the walk on rails.
Leave it off when a step asks the person to actually do something.

## Restraint

A tour is an interruption. Three or four steps that each point at something the person could not
have guessed is worth it. Fifteen steps naming every button is not, and nobody finishes those.
