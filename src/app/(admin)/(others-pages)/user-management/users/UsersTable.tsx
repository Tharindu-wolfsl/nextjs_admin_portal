"use client";
import { useEffect, useState } from "react";
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/DataTable";
import api from "@/lib/axios";

type User = {
    id: number;
    name: string;
    email: string;
};

export default function UsersTable() {
    const [data, setData] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);

    const fetchUsers = async () => {
        const sort = sorting[0];
        const params: any = {
            _page: page + 1,
            _limit: pageSize,
            _sort: sort?.id,
            _order: sort?.desc ? "desc" : "asc",
        };

        filters.forEach(f => {
            params[f.id] = f.value;
        });

        const res = await api.get("/users", { params });
        setData(res.data);
        setTotal(Number(res.headers["x-total-count"]) || 100);
    };

    useEffect(() => {
        fetchUsers();
    }, [page, pageSize, sorting, filters]);

    const handleEdit = (user: User) => {
        alert(`Editing user: ${user.name}`);
    };

    const handleDelete = (user: User) => {
        alert(`Deleting user: ${user.name}`);
    };

    const handleView = (user: User) => {
        alert(`Viewing user: ${user.name}`);
    };

    const columns: ColumnDef<User>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <button onClick={() => handleView(row.original)} className="text-blue-500 underline">View</button>
                    <button onClick={() => handleEdit(row.original)} className="text-green-600 underline">Edit</button>
                    <button onClick={() => handleDelete(row.original)} className="text-red-500 underline">Delete</button>
                </div>
            ),
        },
    ];

    return (
        <main>
            <DataTable
                columns={columns}
                data={data}
                total={total}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                sorting={sorting}
                setSorting={setSorting}
                filters={filters}
                setFilters={setFilters}
            />
        </main>
    );
}
