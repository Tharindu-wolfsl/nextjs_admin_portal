"use client";
import React from "react";

const UserRoleTable = () => {
    const columns = [
        { Header: "ID" },
        { Header: "Role ID" },
        { Header: "User ID" },
        { Header: "Created At" },
        { Header: "Updated At" },
    ];

    return (
        <table style={{ border: "1px solid black", width: "100%" }}>
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
            <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: "10px" }}>
                    No data available
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default UserRoleTable;
