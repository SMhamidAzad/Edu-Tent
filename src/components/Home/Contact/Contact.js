import React from 'react';
import contact from '../../../img/contact (2).png'
import emailjs from 'emailjs-com'

const Contact = () => {
    const sendEmail = e=>{
        e.preventDefault();

        emailjs.sendForm('service_gx5x2rp','template_y5nr1yt',e.target, 'fOp8KRXuZ7yMY8Tna').then(res =>{
            e.target.reset();
            console.log(res);
        }).catch(error =>{
            console.log(error);
        })
    }
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src={contact} class="max-w-sm rounded-lg " alt='#'/>
                <div className='mr-20'>
                    <h1 class="text-5xl font-semibold mb-5">Contact With Us!</h1>
                    <form onSubmit={sendEmail}  className='mx-8'>
                                <input 
                                type="text"
                                name='name' 
                                placeholder="Name" 
                                class="input input-bordered input-secondary w-full my-3" />
                                <br />

                                <input 
                                type="email" 
                                name='user_email'
                                placeholder="Email" 
                                class="input input-bordered input-secondary w-full mb-3" />
                                <br />

                                <textarea 
                                class="textarea textarea-secondary w-full mb-3" 
                                name='message'
                                placeholder="Your Message"></textarea>
                                <br />
                                <input className='btn btn-primary btn-md w-full mb-5' type="submit" value="Send Email" />
                            </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;


