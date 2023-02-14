import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FcReading } from 'react-icons/fc';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import useAdmin from '../../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SingleClassInfo from './SingleClassInfo';
import useProfile from '../../../hooks/useProfile';
import { toast } from 'react-toastify';

const ClassInfo = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const { id } = useParams();
    const [myClass, setMyClass] = useState([]);
    const [classWork, setClassWork] = useState([]);
    const profile = useProfile(user?.email);

    console.log(classWork);
    let url;
    if (admin) {
        url = `http://localhost:5000/class/created/teacher/${id}`
    } else {
        url = `http://localhost:5000/class/${id}`
    }
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMyClass(data))
    }, [url])


    useEffect(() => {
        const url = `http://localhost:5000/classwork/${id}`
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => setClassWork(data.reverse()))
    }, [id])

    const date = new Date();
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${day}-${month}-${year}`;
    const submitClassWork = e => {
        e.preventDefault();

        const classwork = {
            classId: id,
            teacher: profile?.name,
            teacherPic: profile?.photo,
            date: currentDate,
            topic: e.target.topic.value,
            classwork: e.target.classwork.value,
            link: e.target.link.value
        }

        fetch('http://localhost:5000/classwork', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(classwork)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Successfully Assigned ClassWork!", {
                    position: 'top-center'
                })
            })

    }
    return (
        <div>
            <div className='h-1/5 bg-emerald-400 border-b-4 border-primary'>
                <div className='flex justify-end mb-[-50px]'>
                    <button className='btn mt-5 mr-10 btn-outline '>
                        <BsFillPeopleFill className='text-xl text-white' />
                    </button>
                </div>
                <div className='py-20 px-10 flex justify-between  items-center'>
                    <div>
                        <h2 className='text-white text-5xl font-medium'>Subject: {myClass.subject} <FcReading className='inline text-7xl mt-[-20px]'></FcReading></h2>
                        <div className='flex items-center '>
                            <FaChalkboardTeacher className='text-2xl text-yellow-300' />
                            <h3 className='text-2xl ml-3 text-yellow-300 font-medium'>{myClass.teacher}</h3>
                        </div>
                    </div>
                    <h3 className='text-4xl text-yellow-200 font-mono'>section: {myClass.section}</h3>
                </div>
            </div>
            <div>
                {admin && <div className='mx-32 my-10'>
                    <h2 className='mb-3 text-xl font-semibold'>Update Your Class</h2>
                    <form onSubmit={submitClassWork} className=''>
                        <input name='topic' type="text" placeholder="Name of the topic" class="input input-bordered input-primary w-full" /><br /><br />
                        <textarea name='classwork' class="textarea textarea-primary w-full" placeholder="Write class work here"></textarea>
                        <input name='link' type="text" placeholder="Add a link" class="input input-bordered input-primary w-full" /><br /><br />
                        <input className='btn btn-primary' type="submit" value="Update Class" />


                    </form>
                </div>}
            </div>
            <div>
                {!admin && <div>
                    <div className='mx-6 md:mx-24 mt-5'>
                        {
                            classWork.map((item, index) => <SingleClassInfo key={index} item={item}></SingleClassInfo>)
                        }
                    </div>

                </div>}
            </div>
        </div>
    );
};

export default ClassInfo;