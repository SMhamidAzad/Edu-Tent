import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useProfile from '../../../hooks/useProfile';

const MyProfile = () => {
    const [user, loading, error] = useAuthState(auth);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const email = user?.email;
    const profile = useProfile(email);

    console.log(profile)
    const imageStorageKey = '1c47ecbac30f9168913be4c44e47e86f'
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const profile = {
                        email: user?.email,
                        name: data.name,
                        institution: data.institution,
                        id: data.id,
                        phone: data.phone,
                        address: data.address,
                        photo: img
                    }

                    fetch(`http://localhost:5000/profile/${user?.email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(profile)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success("Profile successfully updated!", {
                                position: 'top-center'
                            })
                        })
                    reset();
                }
            })
    }
    
    return (
        <div className="grid grid-cols-2 ">
            <div className='mt-8 flex justify-center '>
                <div className="text-center lg:text-left mx-16">
                    <div className="card w-96 bg-blue-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body" >
                            <h3 className='text-2xl mb-4 font-medium'>Update your profile</h3>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered w-full max-w-xs kbd"
                                    {...register("name", {
                                        required: {
                                            value: true
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Institution"
                                    className="input input-bordered w-full max-w-xs kbd"
                                    {...register("institution", {
                                        required: {
                                            value: true
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="User Id"
                                    className="input input-bordered w-full max-w-xs kbd"
                                    {...register("id", {
                                        required: {
                                            value: true
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="input input-bordered w-full max-w-xs kbd"
                                    {...register("phone", {
                                        required: {
                                            value: true
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered w-full max-w-xs kbd"
                                    {...register("address", {
                                        required: {
                                            value: true
                                        }
                                    })}
                                />
                            </div>

                            <label class="block" />
                            <span class="sr-only">Choose profile photo</span>
                            <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 mb-[-10px]
    "  {...register("image", {
        required: {
            value: true,
        }
    })}
    />
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="submit" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div className='mt-8 flex justify-center'>
                <div class="card w-96 bg-blue-100 shadow-xl">
                    <h2 className='text-center font-medium text-2xl mt-8 mb-[-10px]'>My Profile</h2>
                    <div class="card-body ">
                        <div className='flex justify-center'>
                            <div class="text-center avatar online placeholder">
                                <div class="bg-neutral-focus text-neutral-content rounded-full w-32">
                                    <img src={profile?.photo} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='ml-5 mt-5 '>
                            <p className='font-semibold kbd w-full py-2'>Name: <span className=''>{profile?.name}</span></p>
                            <p className='font-semibold kbd w-full py-2'>Email: <span className=''>{user?.email}</span></p>
                            <p className='font-semibold kbd w-full py-2'>Institution: <span className=''>{profile?.institution}</span></p>
                            <p className='font-semibold kbd w-full py-2'>User Id: <span className=''>{profile?.id}</span></p>
                            <p className='font-semibold kbd w-full py-2'>Address: <span className=''>{profile?.address}</span></p>
                            <p className='font-semibold kbd w-full py-2'>Phone: <span className=''>{profile?.phone}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default MyProfile;