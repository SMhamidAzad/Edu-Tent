import React, { useEffect, useState } from 'react';
import AllUserRow from './AllUserRow';

const AllUser = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
  }, [])
  return (
    <div>
      <h1 className='text-2xl font-mono pt-3 pb-1'><u>Make Admin From Here: </u></h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => <AllUserRow
                key={user._id}
                index={index}
                user={user}
              ></AllUserRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;