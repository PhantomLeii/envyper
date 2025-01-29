import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/projects";
import { Spinner } from "@heroui/spinner";
import { formatDate } from "@/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Link } from "@tanstack/react-router";

export default function Component() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  function getEmptyState() {
    if (error) {
      console.log(error);
      return "Failed fetching projects";
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
            <p>{getEmptyState()}</p>
          </>
        }
      >
        <>
          {data?.map((project) => (
            <TableRow key={`${project.name}-${project.id}`}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{formatDate(project.created_at)}</TableCell>
              <TableCell>
                <Link
                  to={`/projects/${project.id}`}
                  className="flex justify-center gap-2 hover:text-default-600 hover:bg-default-200 rounded-md p-2"
                >
                  <span>View</span>
                  <ArrowTopRight className="text-sm" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
}

function ArrowTopRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
