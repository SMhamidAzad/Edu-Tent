import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useProfile from '../../../hooks/useProfile';

const JoinClassModal = () => {
    const [user] = useAuthState(auth);
    const profile = useProfile(user?.email);
    const onSubmit =  (e)=>{
        e.preventDefault();
        
        const classEnroll = {
            email: profile?.email,
            code: e.target.code.value
        }
        fetch('http://localhost:5000/class/enroll', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(classEnroll)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Successfully enroll the Class!", {
                    position: 'top-center'
                })
            })

    }
    return (
        <div>
            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative bg-blue-100">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2 ">✕</label>
                    <h3 class=" font-mono text-center text-2xl">Join Class</h3>
                    <h4 className='text-xl my-3 font-medium'>Class Code</h4>
                    <p className='mb-3 font-mono'>Ask your teacher for class code, then enter it here</p>
                    <form onSubmit={onSubmit}>
                    <input name='code' type="text" placeholder="Class Code" class="input input-bordered w-full max-w-xs kbd" />
                    <br />
                        <input className='btn btn-primary mt-5 text-center ' type="submit" value="Join" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default JoinClassModal;