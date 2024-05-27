import { Table } from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem>
          <div className="px-4 text-sm">
            Page {table.getState().pagination.pageIndex + 1} /{' '}
            {table.getPageCount()}
          </div>
        </PaginationItem>
        <PaginationItem>
          <div className="flex items-center">
            <Button
              className="p-0"
              variant={'ghost'}
              disabled={!table.getCanPreviousPage()}
            >
              <PaginationPrevious
                onClick={() => table.previousPage()}
                size={'sm'}
              ></PaginationPrevious>
            </Button>
            <Button
              className="p-0"
              variant={'ghost'}
              disabled={!table.getCanNextPage()}
            >
              <PaginationNext
                onClick={() => table.nextPage()}
                size={'sm'}
              ></PaginationNext>
            </Button>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
