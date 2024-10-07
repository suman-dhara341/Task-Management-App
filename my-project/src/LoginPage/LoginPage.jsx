import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



const LoginPage = () => {
    const navigate=useNavigate()

    const [data, setData] = useState({
        phone: '',
        password: ''
    })

    const [passwordShow, setPasswordShow] = useState(false)

    const passwordHandel = () => {
        setPasswordShow(!passwordShow)
    }

    const handleData = (e) => {
        let { name, value } = e.target;

        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

            try {
                const response = await axios.post('http://localhost:3000/api/Login', {
                    phone: data.phone,
                    password: data.password
                });
                const { token } = response.data;
                
                localStorage.setItem('token', token);


                toast.success('Login successful!');
                setData({
                    phone: '',
                    password: '',
                })
                navigate('/Task');

            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                toast.error('User not valid');
            }
    };
    return (
        <>
            <div className='h-[80vh] w-full bg-blue-300 flex items-center justify-center'>
                <div className='flex items-center justify-center gap-4 pt-6 h-[50vh] w-80 md:w-[80%] md:h-[60vh] bg-slate-500 rounded-lg mb-2 '>

                    <form className='flex flex-col items-center justify-center md:pr-4 w-full md:w-1/2' onSubmit={handleSubmit}>
                        <h2 className='font-bold mb-4'>Login Page</h2>
                        <div className='flex items-center justify-center gap-4 mb-6'>
                            <i className="fa-solid fa-user fa-lg"></i>
                            <input
                                className='h-10 rounded-lg p-4'
                                type="text"
                                placeholder='Phone'
                                name='phone'
                                value={data.phone}
                                onChange={handleData}
                            />
                        </div>
                        <div className='flex items-center justify-center gap-4 relative'>
                            <i className="fa-solid fa-lock fa-lg"></i>
                            <input
                                className='h-10 rounded-lg p-4'
                                type={passwordShow ? "text" : "password"}
                                placeholder='Password'
                                name="password"
                                value={data.password}
                                onChange={handleData}
                            />
                            {
                                passwordShow ?
                                    <i className="fa-solid fa-eye absolute right-4 cursor-pointer"
                                        onClick={passwordHandel}
                                    ></i>
                                    :
                                    <i className="fa-solid fa-eye-slash absolute right-4 cursor-pointer"
                                        onClick={passwordHandel}
                                    ></i>
                            }
                        </div>

                        <div className='mt-4'>
                            <Link to="/" className='ml-4 hover:text-blue-800'>New User?</Link>
                        </div>
                        <button className="mt-6 mb-4 bg-blue-500 h-10 w-36 rounded-xl">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
