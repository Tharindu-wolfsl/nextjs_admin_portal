
import React from 'react'
import User from '../models/User';

export const dynacmic = 'force-dynamic';

async function getUsers(params) {
    const users = User.findAll();
    return {users};
}
async function page() {
    const {users} = await getUsers();
  return (
    <>
        <h1>User List</h1>
        {
            users.map((user)=>(
                    <div key={user.id}>Name: {user.name}</div>
            ))
        }
    </>
  )
}

export default page