import { createTreeCollection } from "@ark-ui/react/collection";
import { TreeViewNodeProvider } from "@ark-ui/react/tree-view";
import { ChevronRight, File, Folder } from "lucide-react";
import {
  TreeView,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewTree,
} from "@/components/react";

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "root",
    name: "registry",
    children: [
      {
        id: "shared",
        name: "shared",
        children: [{ id: "button-styles", name: "button.styles.ts" }],
      },
      { id: "react", name: "react", children: [{ id: "button-react", name: "Button.tsx" }] },
      { id: "theme", name: "theme.css" },
    ],
  },
});

export default function TreeViewOverview() {
  return (
    <TreeView collection={collection} defaultExpandedValue={["shared"]} className="max-w-72">
      <TreeViewLabel>Registry sources</TreeViewLabel>
      <TreeViewTree>
        {collection.rootNode.children?.map((node, index) => (
          <TreeViewNodeProvider key={node.id} node={node} indexPath={[index]}>
            {node.children ? (
              <TreeViewBranch>
                <TreeViewBranchControl>
                  <TreeViewBranchIndicator>
                    <ChevronRight />
                  </TreeViewBranchIndicator>
                  <Folder className="size-4 shrink-0 text-dimmed" />
                  <TreeViewBranchText>{node.name}</TreeViewBranchText>
                </TreeViewBranchControl>
                <TreeViewBranchContent>
                  {node.children.map((child) => (
                    <TreeViewItem key={child.id}>
                      <File className="size-4 shrink-0 text-dimmed" />
                      <TreeViewItemText>{child.name}</TreeViewItemText>
                    </TreeViewItem>
                  ))}
                </TreeViewBranchContent>
              </TreeViewBranch>
            ) : (
              <TreeViewItem>
                <File className="size-4 shrink-0 text-dimmed" />
                <TreeViewItemText>{node.name}</TreeViewItemText>
              </TreeViewItem>
            )}
          </TreeViewNodeProvider>
        ))}
      </TreeViewTree>
    </TreeView>
  );
}
