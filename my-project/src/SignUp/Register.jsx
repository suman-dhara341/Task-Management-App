import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';



const Register = () => {
    const [data, setData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        cPassword: ''
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

        if (data.password === data.cPassword) {
            console.log(data);
            try {
                const response = await axios.post('http://localhost:3000/api/Register', {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    password: data.password
                });

                toast.success('Registration successful!');
                setData({
                    name:'',
                    phone:'',
                    email:'',
                    password:'',
                    cPassword:''
                })
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                toast.error('Error in registration!');
            }
        } else {
            toast.warn("Passwords do not match");
        }
    };

    return (
        <>
            <div className='h-[90vh] w-full bg-blue-300 flex items-center justify-center' onSubmit={handleSubmit}>
                <div className='flex items-center justify-center gap-4 pt-6 h-[70vh] w-96 md:w-[80%] md:h-[80vh] bg-slate-500 rounded-lg mb-2'>

                    <form className='flex flex-col items-center justify-center md:pr-4 w-full md:w-1/2'>
                        <h2 className='font-bold mb-4'>Registration form</h2>

                        <div className='flex items-center justify-center gap-4'>
                            <i className="fa-solid fa-user fa-lg"></i>
                            <input
                                className='h-10 rounded-lg p-4' type="text"
                                placeholder='Enter Your Name'
                                name='name'
                                value={data.name}
                                onChange={handleData}
                            />
                        </div>

                        <div className='flex items-center justify-center gap-4 mt-4'>
                            <i className="fa-solid fa-phone fa-lg"></i>
                            <input
                                className='h-10 rounded-lg p-4'
                                type="phone"
                                placeholder='Phone phone'
                                name="phone"
                                value={data.phone}
                                onChange={handleData}
                            />
                        </div>

                        <div className='flex items-center justify-center gap-4 mt-4'>
                            <i className="fa-solid fa-envelope fa-lg"></i>
                            <input
                                className='h-10 rounded-lg p-4'
                                type="email"
                                placeholder='Enter Your Email'
                                name="email"
                                value={data.email}
                                onChange={handleData}
                            />
                        </div>

                        <div className='flex items-center justify-center gap-4 mt-4 relative'>
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

                        <div className='flex items-center justify-center gap-4 mt-4'>
                            <i className="fa-solid fa-lock fa-lg"></i>
                            <input
                                className='h-10 rounded-lg p-4'
                                type="password"
                                placeholder='Confirm Your Password'
                                name="cPassword"
                                value={data.cPassword}
                                onChange={handleData}
                            />
                        </div>

                        <div className='mt-4'>
                            <Link to="/login" className='ml-4 hover:text-blue-800'>Login Now</Link>
                        </div>
                        <button className="mt-6 mb-4 bg-blue-500 h-10 w-36 rounded-xl">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
