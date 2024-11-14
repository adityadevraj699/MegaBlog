import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <div className="mb-6 text-center">
                    <Logo width="100%" />
                    <h2 className="mt-4 text-3xl font-semibold text-gray-800">Sign in to your account</h2>
                    <p className="mt-2 text-base text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-600 transition-all duration-200">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Please enter a valid email address',
                                },
                            })}
                        />
                    </div>

                    <div>
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                    </div>

                    <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
