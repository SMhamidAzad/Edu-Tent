import React from 'react';
import { FiLink } from 'react-icons/fi';

const SingleClassInfo = ({ item }) => {
    return (
        <div className='mt-4 p-6 border-2 border-blue-200 bg-blue-50 rounded-md'>
            <div className='flex items-center'>
                <div class="avatar online placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-16">
                        <img src={item?.teacherPic} alt={'sir'} />
                    </div>
                </div>
                <hr />
                <div className='ml-5'>
                    <h5 className='text-xl font-medium'>{item?.teacher}</h5>
                    <p className='font-semibold'>{item?.date}</p>

                </div>
            </div>
            <div className='mt-5'>
                <h5 className='mb-2 text-lg font-medium'>Topic : {item?.topic}</h5>
                <p className='font-mono'>{item?.classwork}</p>
                {
                    item?.link &&
                    <a className='text-blue-800 font-semibold flex items-center gap-2' href={item?.link} target='_blank' rel="noreferrer">
                        <FiLink/>
                        {item?.link}</a>
                }
            </div>
        </div>
    );
};

export default SingleClassInfo;