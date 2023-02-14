import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import logo from './../../img/logo (2).png'
import defaultpic from './../../img/profile.png'
import useAdmin from '../../hooks/useAdmin';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const userLogout = () => {
        signOut(auth);
    }
    const navItems =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/classroom'>Classroom</Link></li>
            {
                admin && <li><Link to='/dashboard'>Dashboard</Link></li>
            }
            <li><Link to='/contact'>Contact</Link></li>
            {user ?
                <li className=''>
                    <div class="dropdown dropdown-end  p-0">
                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img src={defaultpic} alt=''/>
                            </div>
                        </label>
                        <ul tabindex="0" class="lg:mt-48 menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                           
                        <li><Link to='/profile'>My Profile</Link></li>
                            <li><a href='' onClick={userLogout}>Logout</a></li>
                        </ul>
                    </div>
                </li>
                :
                <li><Link to='/login'>Login</Link></li>}
        </>

    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start ml-5">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <div class="w-32 rounded-full">
                    <img src={logo} alt='logo' />
                </div>
            </div>
            <div class="navbar-end mr-5 hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Header;