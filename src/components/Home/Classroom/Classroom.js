import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SingleClass from './SingleClass';
import { BsPlusLg } from 'react-icons/bs';
import JoinClassModal from './JoinClassModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';
import CreateClassModal from './CreateClassModal';

const Classroom = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const [classes, setClasses] = useState([]);
    const [joinclass, setJoinclass] = useState(false);
    const [createclass, setCreateclass] = useState(false);

    let url;
    if (admin) {
        url = `http://localhost:5000/class/teacher/${user?.email}`
    } else {
        url = `http://localhost:5000/class/enroll/${user?.email}`
    }

    useEffect(() => {
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setClasses(data.reverse());
            })
    }, [url])
    return (
        <div>
            {!admin ? <div className='flex justify-end mr-20'>
                <label onClick={() => setJoinclass(true)} for="my-modal-3" className='flex items-center btn btn-outline btn-primary'>
                    <BsPlusLg className='inline mr-1 text-lg' />
                    <span>Join Class</span>
                </label>
            </div> :
                <div className='flex justify-end mr-20'>
                    <label onClick={() => setCreateclass(true)} for="my-modal-3" className='flex items-center btn btn-outline btn-primary'>
                        <BsPlusLg className='inline mr-1 text-lg' />
                        <span>Create Class</span>
                    </label>
                </div>
            }
            <div>
            </div >
            <h2 className='text-4xl font-mono text-center mt-4'>My Classroom</h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 m-8'>
                {
                    classes.map(perClass => <SingleClass
                        key={perClass._id}
                        perClass={perClass}
                    ></SingleClass>)
                }
            </div>
            {
                joinclass && <JoinClassModal />
            }
            {
            createclass && <CreateClassModal />

            }
        </div>
    );
};

export default Classroom;