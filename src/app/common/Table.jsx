"use client";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export default function Table({ data, columns }) {
    const formatDate = (dateValue) => {
        if (dateValue) {
            return new Date(dateValue).toLocaleString();
        }
        return "";
    };
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnOrder,
            columnVisibility,
            columnFilters: filtering,
            globalFilter,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        onColumnFiltersChange: setFiltering,
        onGlobalFilterChange: setGlobalFilter,
    });

    const toggleColumnVisibility = (columnId) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Search Input */}
            {/*<div className="p-4">*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={globalFilter}*/}
            {/*        onChange={(e) => setGlobalFilter(e.target.value)}*/}
            {/*        placeholder="Global Search..."*/}
            {/*        className="border p-2 w-full"*/}
            {/*    />*/}
            {/*</div>*/}

            {/* Show Columns Dropdown */}
            <div className="p-4 flex items-center justify-between">
                <details>
                    <summary className="cursor-pointer bg-gray-200 p-2 rounded">
                        Show Columns
                    </summary>
                    <div className="absolute bg-white border mt-2 shadow rounded p-2">
                        {columns.map((column) => (
                            <div key={column.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={columnVisibility[column.id] !== false}
                                    onChange={() => toggleColumnVisibility(column.id)}
                                    className="mr-2"
                                />
                                {column.header}
                            </div>
                        ))}
                    </div>
                </details>

                {/* Column Order Display */}
                <div className="flex space-x-2">
                    {columnOrder.map((col) => (
                        <span
                            key={col}
                            className="p-2 bg-gray-300 rounded"
                        >
                            {col}
                        </span>
                    ))}
                </div>
            </div>

            {/* UserRole */}
            <div className="flex-1 overflow-auto">
                <table className="w-full border-collapse border">
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-2 border"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                {
                                                    asc: "🔼",
                                                    desc: "🔽",
                                                }[header.column.getIsSorted() ?? null]
                                            }
                                            {/* Column Filter */}
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    placeholder="Filter..."*/}
                                            {/*    value={filtering[header.column.id] ?? ""}*/}
                                            {/*    onChange={(e) =>*/}
                                            {/*        setFiltering((prev) => ({*/}
                                            {/*            ...prev,*/}
                                            {/*            [header.column.id]: e.target.value,*/}
                                            {/*        }))*/}
                                            {/*    }*/}
                                            {/*    className="mt-1 p-1 w-full border rounded"*/}
                                            {/*/>*/}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2 border">
                                    {cell.column.id === "created_at" ||
                                    cell.column.id === "updated_at"
                                        ? formatDate(cell.getValue())
                                        : flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex justify-between items-center border-t">
                <button
                    className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>
                <button
                    className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
