"use client";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
    SortingState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";

import React, {useState} from "react";
import Button from "@/components/ui/button/Button";
import ColumnVisibilityDropdown from "@/components/tables/ColumnVisibilityDropdown";

type Props<TData> = {
    columns: ColumnDef<TData, any>[];
    data: TData[];
    total: number;
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setSorting: (sort: SortingState) => void;
    sorting: SortingState;
    setFilters: (filters: ColumnFiltersState) => void;
    filters: ColumnFiltersState;
};

export function DataTable<TData>({
                                     columns,
                                     data,
                                     total,
                                     page,
                                     pageSize,
                                     setPage,
                                     setPageSize,
                                     sorting,
                                     setSorting,
                                     filters,
                                     setFilters,
                                 }: Props<TData>) {

    const [columnVisibility, setColumnVisibility] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(total / pageSize),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        state: {
            pagination: {
                pageIndex: page,
                pageSize,
            },
            sorting,
            columnFilters: filters,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: (updater) => {
            const newState = typeof updater === "function" ? updater({pageIndex: page, pageSize}) : updater;
            setPage(newState.pageIndex);
            setPageSize(newState.pageSize);
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleExport = async (type: "csv" | "excel") => {
        try {
            const params = new URLSearchParams();

            // Add sorting
            sorting.forEach(sort => {
                params.append("sort", `${sort.id}:${sort.desc ? "desc" : "asc"}`);
            });

            // Add filters
            filters.forEach(filter => {
                params.append(`filter[${filter.id}]`, filter.value as string);
            });

            // Export endpoint with query
            const res = await fetch(`/api/export?type=${type}&${params.toString()}`);

            if (!res.ok) throw new Error("Failed to export data");

            const blob = await res.blob();
            const fileName = `data_export.${type === "csv" ? "csv" : "xlsx"}`;

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Export failed:", err);
        }
    };

    return (
        <div>
            <div className="flex justify-between align-middle my-2 mx-5">
                <div>
                    <Button onClick={() => handleExport("csv")} size="export" variant="primary" className={'mr-2'}>
                        Export CSV
                    </Button>
                    <Button  onClick={() => handleExport("excel")} size="export" variant="secondary">
                        Export Excel
                    </Button>
                </div>
                <ColumnVisibilityDropdown table={table}/>
            </div>
            <div
                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableCell isHeader key={header.id}
                                                       className="px-5 py-3 font-medium text-gray-500 text-start text-theme-md dark:text-gray-400">
                                                {header.isPlaceholder ? null : (
                                                    <div onClick={header.column.getToggleSortingHandler()}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: " 🔼",
                                                            desc: " 🔽",
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </div>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                ))}
                                <TableRow>
                                    {table.getHeaderGroups()[0].headers.map(header => (
                                        <TableCell key={header.id}
                                                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {header.column.getCanFilter() ? (
                                                <input
                                                    type="text"
                                                    value={(header.column.getFilterValue() as string) ?? ""}
                                                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                    placeholder={`Filter`}
                                                />
                                            ) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="px-5 py-4 sm:px-6 text-start">
                                                <div>
                        <span className="block font-normal text-gray-800 text-theme-md dark:text-white/90">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* Pagination Controls with Info */}
                        <div
                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t mt-4 m-4">
                            {/* Rows per page selector */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">Rows per page:</span>
                                <select
                                    className="border rounded px-2 py-1 text-sm"
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                >
                                    {[5, 10, 20, 50, 100].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>

                             {/*Page number buttons*/}
                            <div className="flex items-center gap-2 justify-center">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 0}
                                    className="text-black  disabled:text-gray-300"
                                >
                                    ‹
                                </button>

                                {Array.from({length: Math.ceil(total / pageSize)}, (_, i) => i).slice(
                                    Math.max(0, page - 2),
                                    Math.min(Math.ceil(total / pageSize), page + 3)
                                ).map(i => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i)}
                                        className={`w-8 h-8 text-sm rounded-full ${
                                            i === page
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={(page + 1) * pageSize >= total}
                                    className="text-black disabled:text-gray-300"
                                >
                                    ›
                                </button>
                            </div>

                            {/* Info text */}
                            <div className="text-sm text-gray-700 text-center md:text-right">
                                {`${page * pageSize + 1}–${Math.min((page + 1) * pageSize, total)} of ${total} items`}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
