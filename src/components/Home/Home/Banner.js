import React from 'react';
import { Link } from 'react-router-dom';
import classroom from './../../../img/classroom.png'

const Banner = () => {
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row">
                <img 
                 data-aos="flip-left"
                 data-aos-easing="linear"
                 data-aos-duration="1500"
                src={classroom} class="max-w-sm" />
                <div>
                    <h1 
                    data-aos="zoom-out-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    class="text-5xl font-bold">Online Classroom</h1>
                    <p class="py-6 font-serif">Edu tent is your all-in-one place for teaching and learning. Our easy-to-use and secure tool helps educators manage, measure, and enrich learning experiences.</p>
                    <Link to='/login'  class="btn btn-primary hover:animate-pulse">Get Started</Link >
                </div>
            </div>
        </div>
    );
};

export default Banner;