import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedInUser } from './features/auth/authApiSlice';
import { getAllPermission, getAllRoles, getAllUser } from './features/user/userApiSlice';

function App() {

  const dispatch = useDispatch(); 

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUser());    
    }
  },[dispatch]);

  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUser());
  },[dispatch]);
  

  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}

export default App
