
import React from 'react'
import User from '../../models/User';
import PermissionsEnum from "../../enums/PermissionsEnum";

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
        <h1>User List</h1>
        {
            users.map((user)=>(
                    <div key={user.id}>Name: {user.name}</div>
            ))
        }
        <h1>Permission List</h1>
        {
            permissions.map((permission)=>(
                <div key={permission.value}>Value: {permission.value}</div>
            ))
        }
    </>
  )
}

export default page