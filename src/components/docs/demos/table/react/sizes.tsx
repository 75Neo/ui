import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function TableSizes() {
  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <Table key={size} size={size}>
          <TableHeader>
            <TableRow>
              <TableHead>{size}</TableHead>
              <TableHead>Adapters</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs text-default">button</TableCell>
              <TableCell className="text-muted">React and Vue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs text-default">table</TableCell>
              <TableCell className="text-muted">React and Vue</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
