import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { cn } from "../../lib";
import { FilterFilled } from "@ant-design/icons";

interface ColumnType<T = any> {
  key: string;
  title: string;
  dataIndex: keyof T;
  headerClassName?: string;
  render?: (value: any, record: T, index?: number) => React.ReactNode;
  filters?: { text: string; value: any }[];
  onFilter?: (value: any, record: T) => boolean;
}

interface CustomTableProps<T = any> {
  columns: ColumnType<T>[];
  visibleData: T[];
  totalItems?: number;
  pageSize?: number;
  isLoading?: boolean;
  rowClassName?: (record: T, index: number) => string;
  expandedRowRender?: (record: T) => React.ReactNode;
  onFetchPage?: (page: number, pageSize: number) => void; // new!
}

export const CustomTable = <T extends Record<string, any>>({
  columns,
  visibleData,
  isLoading = false,
  expandedRowRender,
  rowClassName,
  pageSize = 10,
  totalItems,
  onFetchPage,
}: CustomTableProps<T>) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((totalItems || 0) / pageSize);

  const handleFilter = (data: T[] | undefined | null): T[] => {
    if (!Array.isArray(data)) return [];

    return data.filter((item) =>
      columns.every((col) => {
        const filterValue = filters[col.dataIndex as string];
        if (!col.onFilter || filterValue === undefined) return true;
        return col.onFilter(filterValue, item);
      })
    );
  };

  const filteredData = handleFilter(visibleData);

  useEffect(() => {
    if (onFetchPage) {
      onFetchPage(currentPage, pageSize);
    }
  }, [currentPage, pageSize]);

  if (isLoading) {
    return (
      <div className="w-screen">
        <LoadingScreen messageQueue={"Loading..."} />
      </div>
    );
  }

  return (
    <>
      <Table className="custom-ant-table border dark:border-gray-700 rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            {expandedRowRender && <TableHead className="w-12"></TableHead>}
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                className={
                  col.headerClassName || "text-gray-900 dark:text-gray-100"
                }
              >
                <div className="flex justify-between items-center">
                  <div>{col.title}</div>
                  {col.filters && (
                    <div className="relative">
                      <details className="group">
                        <summary className="cursor-pointer text-xs text-blue-500 hover:underline">
                          {col.filters?.map((filter, idx) => (
                            <FilterFilled key={idx} {...filter} />
                          ))}
                        </summary>
                        <div className="hidden absolute z-10 bg-white dark:bg-gray-800 border rounded shadow p-2 mt-1 w-48 text-sm space-y-2">
                          {col.filters.map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={filters[
                                  col.dataIndex as string
                                ]?.includes(f.value)}
                                onChange={() => {
                                  setFilters((prev) => {
                                    const current =
                                      prev[col.dataIndex as string] || [];
                                    const updated = current.includes(f.value)
                                      ? current.filter(
                                          (val: any) => val !== f.value
                                        )
                                      : [...current, f.value];
                                    return {
                                      ...prev,
                                      [col.dataIndex as string]: updated,
                                    };
                                  });
                                }}
                              />
                              <span>{f.text}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-2 border-t">
                            <button
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  [col.dataIndex as string]: [],
                                }));
                              }}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Reset
                            </button>
                            <button className="text-xs text-blue-600 hover:underline">
                              Apply
                            </button>
                          </div>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (expandedRowRender ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((row, index) => {
              const isExpanded = expandedRowIndex === index;

              return (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={() =>
                      expandedRowRender &&
                      setExpandedRowIndex(isExpanded ? null : index)
                    }
                    style={{
                      cursor: expandedRowRender ? "pointer" : "default",
                    }}
                    className={cn(
                      "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200",
                      isExpanded
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : "bg-white dark:bg-gray-900",
                      rowClassName?.(row, index)
                    )}
                  >
                    {expandedRowRender && (
                      <TableCell className="w-10 text-center font-bold">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRowIndex(isExpanded ? null : index);
                          }}
                          className="text-xl text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          {isExpanded ? "−" : "+"}
                        </button>
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(row[col.dataIndex], row, index)
                          : row[col.dataIndex]}
                      </TableCell>
                    ))}
                  </TableRow>

                  {expandedRowRender && isExpanded && (
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableCell
                        colSpan={columns.length + 1}
                        className="p-4 border-t border-blue-100 dark:border-gray-700"
                      >
                        <div className="ml-4 border-l-2 border-blue-200 pl-4">
                          {expandedRowRender(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          )}
        </TableBody>
      </Table>

      {onFetchPage && totalItems && (
        <div className="flex justify-end mt-4 gap-2 flex-wrap text-sm">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            First
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 10))}
            disabled={currentPage <= 10}
            className="px-3 py-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            «
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="px-3 py-1 border rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from(
            { length: Math.ceil(totalItems / pageSize) },
            (_, i) => i + 1
          )
            .filter((pageNum) => {
              const start = Math.max(1, currentPage - 2);
              const end = Math.min(start + 4, Math.ceil(totalItems / pageSize));
              return pageNum >= start && pageNum <= end;
            })
            .map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                } border-gray-300 dark:border-gray-600`}
              >
                {pageNum}
              </button>
            ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 border rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 10))}
            disabled={currentPage + 10 > totalPages}
            className="px-3 py-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            »
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};
