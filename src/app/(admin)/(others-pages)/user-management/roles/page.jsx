
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
            <PageBreadcrumb pageTitle="Roles Management" />
            <div className="space-y-6 my-5">
                <ComponentCard title="Roles Table">
                    {/*<UsersTable/>*/}
                </ComponentCard>
            </div>
        </div>
    </>
  )
}

export default page