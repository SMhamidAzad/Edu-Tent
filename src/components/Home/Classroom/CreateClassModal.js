import React from 'react';
import useProfile from '../../../hooks/useProfile';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

const CreateClassModal = () => {
    const [user] = useAuthState(auth);
    const profile = useProfile(user?.email);
    const handleCreateClass = e => {
        e.preventDefault();

        const createClass = {
            teacherPic: profile?.photo,
            teacher: profile?.name,
            email: user?.email,
            class: e.target.class.value,
            classImg: e.target.classImg.value,
            section: e.target.section.value,
            subject: e.target.subject.value,
            code: e.target.code.value
        }

        console.log(createClass);

        fetch('http://localhost:5000/class', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(createClass)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Successfully Created Class!", {
                    position: 'top-center'
                })
            })
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-3" class="modal-toggle " />
            <div class="modal">
                <div class="modal-box relative bg-blue-100">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2 ">✕</label>
                    < div className='flex justify-center'>
                    <div className='w-full text-center'>
                        <h2 className='text-2xl font-mono my-4'>Create Class</h2>
                        <form onSubmit={handleCreateClass}>
                            <input name='class' type="text" placeholder="Class Name" class="input input-bordered w-full max-w-xs mb-2 kbd" /><br />
                            <input name='classImg' type="text" placeholder="Class image link" class="input input-bordered w-full max-w-xs mb-2 kbd" /><br />
                            <input name='section' type="text" placeholder="Section" class="input input-bordered w-full max-w-xs mb-2 kbd" /><br />
                            <input name='subject' type="text" placeholder="Subject" class="input input-bordered w-full max-w-xs mb-2 kbd" /><br />
                            <input name='code' type="text" placeholder="Class Code" class="input input-bordered w-full max-w-xs mb-2 kbd" /> <br />
                            <input type="submit" value='CREATE' class="btn btn-md btn-primary w-full max-w-xs" />
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CreateClassModal;