import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';
import classimg from '../../../img/class.png'
import defaultpic from './../../../img/profile.png'

const SingleClass = ({ perClass }) => {

    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const { _id, subject,teacherPic, teacher, classImg, classId, section } = perClass;

    let id;
    if (admin) {
        id = _id;
    } else {
        id = classId;
    }
    const navigate = useNavigate();

    return (
        <div
            data-aos="flip-left"
            data-aos-easing="linear"
            data-aos-duration="1500"
            class="card card-compact w-96 bg-base-100 shadow-xl my-3  cursor-pointer"
            onClick={() => navigate(`/classinfo/${id}`)}
        >
            <figure><img className='h-52' src={classImg ? classImg : classimg} alt="class" /></figure>
            <div class="card-body">
                <div className='bg-gray-500 rounded-md py-1'>
                <h2 class="card-title text-white ml-3 font-medium">Subject: {subject}</h2>
                </div>
               <div className='flex items-center'>
               <div class="avatar mr-3">
                    <div class="w-12">
                        {
                            teacherPic ?
                            <img className='rounded-full' src={teacherPic} alt=''/> :
                            <img src={defaultpic} alt=''/>
                              
                        }
                    </div>
                </div>
               <div>
                    <p className=' font-mono'>{teacher}</p>
                    <p className=' font-mono'>Section: {section}</p>
                </div>
               </div>

            </div>
        </div>
    );
};

export default SingleClass;