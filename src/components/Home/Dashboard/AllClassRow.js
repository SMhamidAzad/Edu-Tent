import React, { useState } from 'react';

const AllClassRow = ({_id,index,singleClass}) => {
    const {subject,teacher,code}= singleClass;
    const [classes, setClasses] = useState([])
    const handleDeleteBtn = id => {
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/class/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = classes.filter(product => product._id !== id);
                        setClasses(remaining);
                    }
                })
        }
    }
    return (
        <tr>
            <th>{index+1}</th>
            <td>{singleClass.class}</td>
            <td>{subject}</td>
            <td>{teacher}</td>
            <td>{code}</td>
            <td><button onClick={() => handleDeleteBtn(_id)} class="btn btn-xs">Delete</button></td>
        </tr>
    );
};

export default AllClassRow;