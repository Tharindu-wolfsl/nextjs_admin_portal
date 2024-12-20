import UserRoles from '../models/UserRole';
import Table from '../common/Table';
import React from "react";
import DefaultLayout from "/src/components/Layouts/DefaultLayout";

async function getUserRoles() {
    const roles = await UserRoles.findAll();
    console.log(roles)
    console.log('655555555555555555555555555',roles.map(userRole => userRole.dataValues))
    return roles.map(userRole => userRole.dataValues);
}

async function UserRoleTable() {

    const roles = await getUserRoles();
    console.log('kiyooooooooooooooooooooooooooooooo')
    console.log(roles);
    const columns = [
        {Header: "ID", accessor: "id"},
        {Header: "Role ID", accessor: "role_id"},
        {Header: "User ID", accessor: "user_id"},
        {Header: "Created At", accessor: "created_at"},
        {Header: "Updated At", accessor: "updated_at"},
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
