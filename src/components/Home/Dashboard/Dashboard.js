import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';

import { useAuthState } from 'react-firebase-hooks/auth';
import useAdmin from '../../../hooks/useAdmin';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user)
    return (
        <div class="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <h2 className='text-2xl font-medium text-purple-500'>Welcome to your Dashboard</h2>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="dashboard-sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    {/* <li><Link to="/dashboard">My Profile</Link></li> */}
                    {
                        admin && <>
                            <li><Link to="/dashboard">All Class</Link></li>
                            <li><Link to="/dashboard/alluser">All User</Link></li>
                        </>
                    }
                    {/* { admin && <>
                    <li><Link to="/dashboard/users">All Users</Link></li>
                    <li><Link to="/dashboard/addDoctor">Add a Doctor</Link></li>
                    <li><Link to="/dashboard/manageDoctor">Manage Doctors</Link></li>
                </>} */}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;