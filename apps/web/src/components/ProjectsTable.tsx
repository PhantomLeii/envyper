import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/projects";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export default function Component() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  function getEmptyState() {
    if (error) {
      console.log(error);
      return "Could not fetch projects";
    }

    if (data === undefined || data.length === 0) {
      return "No Projects to Display.";
    }
  }

  return (
    <Table isStriped aria-label="Projects list" isHeaderSticky fullWidth>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={
          <>
            <p className="text-danger-400">{getEmptyState()}</p>
          </>
        }
      >
        <>
          {data?.map((project) => (
            <TableRow key={`${project.name}-${project.id}`}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.created_at}</TableCell>
              <TableCell>Some action</TableCell>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
}
