import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/react";

const rows = [
  { item: "button", framework: "React and Vue", files: 2 },
  { item: "container", framework: "React and Vue", files: 2 },
  { item: "navigation-menu", framework: "React and Vue", files: 12 },
  { item: "table", framework: "React and Vue", files: 16 },
];

export default function TableOverview() {
  return (
    <Table>
      <TableCaption>Registry items and the number of source files each one installs.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Adapters</TableHead>
          <TableHead className="text-right">Files</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.item}>
            <TableCell className="font-mono text-xs text-default">{row.item}</TableCell>
            <TableCell className="text-muted">{row.framework}</TableCell>
            <TableCell className="text-right font-mono text-xs text-muted">{row.files}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell className="text-default">Total</TableCell>
          <TableCell />
          <TableCell className="text-right font-mono text-xs text-default">32</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
