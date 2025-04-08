
import React from 'react'
import User from '@/app/models/User';
import PermissionsEnum from "@/app/enums/PermissionsEnum";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import BasicTableOne from "@/components/tables/BasicTableOne";
import UsersTable from "@/app/(admin)/(others-pages)/user-management/users/UsersTable";

export const dynacmic = 'force-dynamic';

async function getUsers(params) {
    const users = await User.findAll();
    return {users};
}
async function getPermissions() {
    const permissions = Object.values(PermissionsEnum);
    return {permissions};
}
async function page() {
    const {users} = await getUsers();    
    const {permissions} = await getPermissions();
  return (
    <>
        <div>
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6 my-5">
                <ComponentCard title="User Table">
                    <UsersTable/>
                </ComponentCard>
            </div>
            {/*<div className="space-y-6 my-5">*/}
            {/*    <ComponentCard title="Dual Auth Table">*/}
            {/*        <BasicTableOne />*/}
            {/*    </ComponentCard>*/}
            {/*</div>*/}
        </div>
        {/*<h1>User List</h1>*/}
        {/*{*/}
        {/*    users.map((user)=>(*/}
        {/*            <div key={user.id}>Name: {user.name}</div>*/}
        {/*    ))*/}
        {/*}*/}
        {/*<h1>Permission List</h1>*/}
        {/*{*/}
        {/*    permissions.map((permission)=>(*/}
        {/*        <div key={permission.value}>Value: {permission.value}</div>*/}
        {/*    ))*/}
        {/*}*/}
    </>
  )
}

export default page