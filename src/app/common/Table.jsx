"use client";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

export default function Table({ data, columns }) {
    const formatDate = (dateValue) => {
        if (dateValue) {
            return new Date(dateValue).toLocaleString();
        }
        return '';
    };

    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnOrder,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnOrderChange: setColumnOrder,
    });

    // Function to toggle column visibility
    const toggleColumnVisibility = (columnId) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };

    return (
        <div className="w3-container">
            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder="Search..."
            />

            <div>
                <ul>
                    {columnOrder.map((columnId) => (
                        <li key={columnId}>{columnId}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Show columns:</h3>
                {columns.map((column) => (
                    <div key={column.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={columnVisibility[column.id] !== false}
                                onChange={() => toggleColumnVisibility(column.id)}
                            />
                            {column.header}
                        </label>
                    </div>
                ))}
            </div>

            {/* Table */}
            <table className="w3-table-all">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                style={{
                                    cursor: 'pointer', // Add cursor pointer for better UX
                                }}
                            >
                                {header.isPlaceholder ? null : (
                                    <div>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            {
                                                asc: '🔼',
                                                desc: '🔽',
                                            }[
                                            header.column.getIsSorted() ?? null
                                                ]}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {cell.column.id === 'created_at' ||
                                cell.column.id === 'updated_at'
                                    ? formatDate(cell.getValue()) // Apply date format here
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
    );
}
