"use client";
import React, { useEffect, useState , } from "react";
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/DataTable";
import api from "@/lib/axios";
import Button from "@/components/ui/button/Button";
import {Eye, Trash2} from "lucide-react";
import {useModal} from "@/hooks/useModal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import {Modal} from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertModal from "@/components/ui/modal/AlertModal";
import Badge from "@/components/ui/badge/Badge";
import {formatDateTime} from "@/lib/utils";


type User = {
    id: number;
    name: string;
    email: string;
};

const formSchema = z.object({
    firstName: z.string().min(1,  {
        message: "First name is required",
    }),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is too short"),
    bio: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;


export default function UsersTable() {
    const [data, setData] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const alertModal = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (data: FormValues) => {
        console.log(data);
        reset();        // Clears validation + form values
        closeModal();
        alertModal.openModal();
        // handle save logic here
    };

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

        const res = await api.get("/api/admin/users", { params });
        setData(res.data.data);
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


    const columns: ColumnDef<User>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "status", header: "Status",
            cell: ({ row }) => (
                <div className="flex w-full justify-center">
                    <Badge size={'md'} variant={'solid'} color={row.getValue('status') == true ? 'success' : 'error'}>{row.getValue('status') == true ? 'Active' : 'Inactive'}</Badge>
                </div>
            ),
        },
        { accessorKey: "created_at", header: "Created at" ,
            cell: ({ row }) => (
                <div className="flex w-full justify-start">
                    <span>{ formatDateTime(row.getValue('created_at'))}</span>
                </div>
                ),
        },
        { accessorKey: "updated_at", header: "Updated at" ,
            cell: ({ row }) => (
                <div className="flex w-full justify-start">
                    <span>{formatDateTime(row.getValue('updated_at'))}</span>
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button size={'xs'} onClick={() => handleEdit(row.original)} variant={'primary'} startIcon={<Eye size="20"/>}> </Button>
                    <Button size={'xs'} onClick={() => handleDelete(row.original)} variant={'negative'} startIcon={<Trash2 size="20"/>}> </Button>
                </div>
            ),
        },
    ];
    const handleClose = () => {
        reset();        // Clears validation + form values
        closeModal();   // Then closes modal
    };
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <main>
            <div className="w-full flex justify-end px-4">
                <Button size="sm" onClick={openModal}>
                    Add New User
                </Button>
            </div>
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
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                showCloseButton={false}
                className="max-w-4xl p-5 lg:p-10"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                        Personal Information
                    </h4>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                        <div className="col-span-1">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type="text"
                                placeholder="Emirhan"
                                error={!!errors.firstName}
                                hint={errors.firstName?.message}
                                {...register("firstName")}
                            />
                        </div>

                        <div className="col-span-1">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type="text"
                                placeholder="Boruch"
                                error={!!errors.lastName}
                                hint={errors.lastName?.message}
                                {...register("lastName")}
                            />
                        </div>

                        <div className="col-span-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="emirhanboruch55@gmail.com"
                                error={!!errors.email}
                                hint={errors.email?.message}
                                {...register("email")}
                            />
                        </div>

                        <div className="col-span-1">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                type="text"
                                placeholder="+09 363 398 46"
                                error={!!errors.phone}
                                hint={errors.phone?.message}
                                {...register("phone")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-full gap-3 mt-6">
                        <Button size="sm" variant="outline" type="button" onClick={handleClose}>
                            Close
                        </Button>
                        <Button size="sm" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>
            <AlertModal
                type="success"
                title="Heads up!"
                message="User Created Successfully"
                btnText="Done"
                isOpen={alertModal.isOpen}
                onClose={alertModal.closeModal}
            />
        </main>
    );
}
