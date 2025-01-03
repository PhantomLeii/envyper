"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";

type ProjectsTableProps = {
  data: Record<string, string>[];
};

export default function ProjectsTable(props: ProjectsTableProps) {
  return (
    <Table isStriped aria-label="Collection table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Description</TableColumn>
      </TableHeader>
      <TableBody>
        <>
          {props.data.map((item, i) => (
            <TableRow key={`${item}-${i}`}>
              <TableCell>
                <Link href={`/projects/${item.id}`}>{item.name}</Link>
              </TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
}