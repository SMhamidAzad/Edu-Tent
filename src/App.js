import { Route, Routes } from 'react-router-dom';
import './App.css';
import Classroom from './components/Home/Classroom/Classroom';
import AllClass from './components/Home/Dashboard/AllClass';
import AllUser from './components/Home/Dashboard/AllUser';
import Dashboard from './components/Home/Dashboard/Dashboard';
import MyProfile from './components/Home/Dashboard/MyProfile';
import Home from './components/Home/Home/Home';
import Login from './components/Home/Login/Login';
import RequireAuth from './components/Home/Login/RequireAuth';
import Signup from './components/Home/Login/Signup';
import Header from './components/Shared/Header';
import AOS from "aos";
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";
import { useEffect } from 'react';
import ClassInfo from './components/Home/Classroom/ClassInfo';
import Contact from './components/Home/Contact/Contact';
import NotFound from './components/Shared/NotFound';
import { ToastContainer } from 'react-toastify';


function App() {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/classroom' element={
          <RequireAuth>
            <Classroom></Classroom>
          </RequireAuth>

        }></Route>
        <Route path='/classinfo/:id' element={
          <RequireAuth>
            <ClassInfo></ClassInfo>
          </RequireAuth>

        }></Route>
        
        <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} >
          {/* <Route index element={<MyProfile></MyProfile>}></Route> */}
          <Route index element={<AllClass></AllClass>}></Route>
          <Route path="alluser" element={<AllUser></AllUser>}></Route>
        </Route>
        <Route path='/profile' element={<MyProfile></MyProfile>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
