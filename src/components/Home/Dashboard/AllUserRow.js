import React from 'react';
import { toast } from 'react-toastify';

const AllUserRow = ({user, index}) => {
    const { _id,email, role } = user;
    const handleMakeAdmin = e =>{
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`${email} is already admin!!`, {
                    position: 'top-center'
                })
            })
    }
    const handleDeleteBtn = e =>{
         console.log(e.target.value);
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role === 'admin'
                ?
                <p className='font-bold'>Already Admin</p>
                :
                <button onClick={handleMakeAdmin} className="btn btn-xs">Make Admin</button>}</td>
            <td><button onClick={() => handleDeleteBtn(_id)} className="btn btn-xs">Remove</button></td>
        </tr>
    );
};

export default AllUserRow;