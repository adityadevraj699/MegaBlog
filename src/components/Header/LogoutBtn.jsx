import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
