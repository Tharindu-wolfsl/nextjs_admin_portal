import UserRoles from '../models/UserRole';
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
    // console.log('kiyooooooooooooooooooooooooooooooo')
    // console.log(roles);
    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            id: "id",
        },
        {
            header: "Role ID",
            accessorKey: "role_id",
            id: "role_id",
        },
        {
            header: "User ID",
            accessorKey: "user_id",
            id: "user_id",
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
            <h2>User Roles</h2>
            <Table data={roles} columns={columns} />
        </div>
        </DefaultLayout>
    );
};

export default UserRoleTable;
