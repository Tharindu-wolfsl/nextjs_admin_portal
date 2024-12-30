import UserRoles from '../models/Permissions';
import Table from '../common/Table';
import React from "react";
import DefaultLayout from "/src/components/Layouts/DefaultLayout";

async function getUserRoles() {
    const roles = await UserRoles.findAll();
    // console.log(roles)
    // console.log('655555555555555555555555555',roles.map(userRole => userRole.dataValues))
    return roles.map(userRole => userRole.dataValues);
}

async function UserRoleTable() {

    const roles = await getUserRoles();
    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            id: "id",
        },
        {
            header: "Name",
            accessorKey: "name",
            id: "name",
        },
        {
            header: "Value",
            accessorKey: "value",
            id: "value",
        },
        {
            header: "Category",
            accessorKey: "category",
            id: "category",
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            id: "created_at",
        },
        {
            header: "Updated At",
            accessorKey: "updated_at",
            id: "updated_at",
        }
    ];
    return (
        <DefaultLayout>
            <div>
                <h2>Permissions</h2>
                <Table data={roles} columns={columns} />
            </div>
        </DefaultLayout>
    );
};

export default UserRoleTable;
