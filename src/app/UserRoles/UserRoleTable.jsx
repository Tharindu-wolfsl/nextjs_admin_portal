// "use client";
import React from "react";
import UserRoles from "../models/UserRole";

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
        <table style={{border: "1px solid black", width: "100%", borderCollapse: "collapse"}}>
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        style={{
                            borderBottom: "1px solid black",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        {column.Header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>


            {roles && roles.length > 0 ? (
                roles.map((userRole) => (
                    <tr key={userRole.id}>
                        {columns.map((column, index) => (
                            <td
                                key={index}
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid black",
                                    textAlign: "left",
                                }}
                            >
                                {column.accessor === "created_at" || column.accessor === "updated_at" ? (
                                    new Date(userRole[column.accessor]).toLocaleString()
                                ) : (
                                    userRole[column.accessor]
                                )}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} style={{textAlign: "center", padding: "10px"}}>
                        No data available
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default UserRoleTable;
