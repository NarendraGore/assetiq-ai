import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CategorySkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-56 animate-pulse rounded bg-muted" />

      <div className="h-10 w-72 animate-pulse rounded bg-muted" />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>
                Description
              </TableHead>

              <TableHead>
                Created
              </TableHead>

              <TableHead>
                Updated
              </TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 6 }).map(
              (_, row) => (
                <TableRow key={row}>
                  {Array.from({
                    length: 5,
                  }).map((_, col) => (
                    <TableCell key={col}>
                      <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}