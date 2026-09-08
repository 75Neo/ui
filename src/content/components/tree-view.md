---
title: Tree View
description: A nested list of branches and items with keyboard navigation.
category: Data display
registryItem: tree-view
---

## Usage

The tree comes from a collection that knows how to read a value, a label and the children out of
whatever shape your nodes already have.

```ts
const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: "root", name: "registry", children: nodes },
});
```

Render a branch for a node with children and an item for one without, walking the collection
yourself so the markup stays yours.

```vue
<template>
  <TreeView :collection="collection" :default-expanded-value="['shared']">
    <TreeViewLabel>Registry sources</TreeViewLabel>
    <TreeViewTree>
      <TreeViewBranch :node="node" :index-path="[index]">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator>
            <ChevronRight />
          </TreeViewBranchIndicator>
          <TreeViewBranchText>{{ node.name }}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewItem :node="child" :index-path="[index, childIndex]">
            <TreeViewItemText>{{ child.name }}</TreeViewItemText>
          </TreeViewItem>
        </TreeViewBranchContent>
      </TreeViewBranch>
    </TreeViewTree>
  </TreeView>
</template>
```

Every node needs its `indexPath`, the list of positions from the root down to it. That is how the
machine knows where a node sits without searching the collection.

## Indentation

Nodes carry a `--depth` property and the recipe indents from it, so nesting is one calculation
rather than a wrapper per level. That also keeps the whole row clickable at every depth, instead of
only the part past the indent.

## Keyboard

Arrow keys move and open, typing jumps to a matching node, and the left arrow on a closed branch
goes to its parent. `typeahead` turns the matching off if the labels are not worth searching.

## Loading children

`loadChildren` fetches a branch's contents the first time it opens, and the branch reports
`data-loading` while it waits. Use it when the tree is large enough that sending all of it would be
wasteful.
