"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { Card, CardHeader, CardContent, CardFooter } from "~/components/ui/card";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function DataTable() {
  const { data: transactions = [], isLoading, error } = api.transaction.getMultiple.useQuery();

  // Column configuration
  const columns = useMemo(
    () => [
      {
        key: "date",
        label: "Date",
        render: (tx: any) =>
          new Date(tx.date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }),
        align: "left",
      },
      {
        key: "description",
        label: "Description",
        // truncate after 20 chars, show full on hover
        render: (tx: any) => {
          const text = tx.description || "";
          const truncated = text.length > 20 ? `${text.slice(0, 20)}…` : text;
          return <span title={text}>{truncated}</span>;
        },
        align: "left",
      },
      {
        key: "amount",
        label: "Amount",
        render: (tx: any) => `$${(tx.amount)}`,
        align: "right",
      },
    ],
    []
  );

  // States for pagination and column selector
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map((c) => c.key)
  );
  const [page, setPage] = useState(1);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const itemsPerPage = 20;
  const maxItems = 200;

  // Limit to most recent 200
  const limitedRows = useMemo(
    () => transactions.slice(0, maxItems),
    [transactions]
  );

  const totalPages = Math.ceil(limitedRows.length / itemsPerPage) || 1;
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return limitedRows.slice(start, start + itemsPerPage);
  }, [limitedRows, page]);

  // Close menu on outside click
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowColumnMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  if (isLoading) {
    return (
      <Card className="w-full h-full p-6 shadow-lg rounded-2xl text-center text-gray-500">
        Loading table...
      </Card>
    );
  }
  if (error) {
    return (
      <Card className="w-full h-full p-6 shadow-lg rounded-2xl text-center text-red-500">
        Error loading data.
      </Card>
    );
  }

  return (
    <Card className="w-full h-full p-4 shadow-lg rounded-2xl relative">
      <CardHeader className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h3>
        <div className="relative" ref={menuRef}>
          <FiFilter
            className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => setShowColumnMenu((v) => !v)}
          />
          {showColumnMenu && (
            <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg z-10">
              {columns.map((col) => (
                <label
                  key={col.key}
                  className="flex items-center space-x-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col.key)}
                    onChange={() => {
                      setSelectedColumns((prev) =>
                        prev.includes(col.key)
                          ? prev.filter((k) => k !== col.key)
                          : [...prev, col.key]
                      );
                    }}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <span className="text-gray-700">{col.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns
                .filter((c) => selectedColumns.includes(c.key))
                .map((c) => (
                  <TableHead
                    key={c.key}
                    className={
                      c.align === "right" ? "text-right" : "text-left"
                    }
                  >
                    {c.label}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-gray-50">
                {columns
                  .filter((c) => selectedColumns.includes(c.key))
                  .map((c) => (
                    <TableCell
                      key={c.key}
                      className={
                        c.align === "right"
                          ? "text-right font-medium"
                          : "text-left"
                      }
                    >
                      {c.render(tx)}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t flex items-center justify-between text-sm text-gray-500">
        <div>
          Showing {paginatedRows.length} of {limitedRows.length} entries
        </div>
        <div className="flex items-center space-x-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="disabled:text-gray-300 hover:text-gray-900"
          >
            <FiChevronLeft />
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="disabled:text-gray-300 hover:text-gray-900"
          >
            <FiChevronRight />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
