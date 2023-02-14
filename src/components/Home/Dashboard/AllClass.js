import React, { useEffect, useState } from 'react';
import AllClassRow from './AllClassRow';

const AllClass = () => {
    const [classes, setClasses] = useState([])

    console.log(classes)
    useEffect(() => {
        fetch('http://localhost:5000/class', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [])
    return (
        <div>
            <h1 className='text-2xl font-mono pt-3 pb-1'>All Class</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Class Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((singleClass, index) => <AllClassRow
                                key={singleClass._id}
                                index={index}
                                singleClass={singleClass}
                            ></AllClassRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllClass;