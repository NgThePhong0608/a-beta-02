import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';

const Create = ({auth, success, time_in}) => {
    const time = new Date();
    const formattedTime = [
        ('0' + time.getHours()).slice(-2),
        ('0' + time.getMinutes()).slice(-2),
        ('0' + time.getSeconds()).slice(-2)
    ].join(':');

    const { data, setData, post, errors, reset } = useForm({
        time_out:formattedTime,
        date:  time.toISOString().slice(0, 10),
        time_in
    });

    const [isOpen, setOpen] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post('/checkout');
    }

    const handleCloseNotify = () => {
        setOpen(true);
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Checkout
                </h2>
            }
        >
            <Head title="Timesheets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        success && (
                            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                {success}
                                <div className="float-right">
                                    <button onClick={handleCloseNotify} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </button>

                                </div>
                            </div>
                        )
                    }
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <div className=" flex items-center justify-center p-6 text-gray-900 dark:text-gray-100">
                            <div
                                className="max-w-[400px] p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <form onSubmit={onSubmit}>
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Checkout date: {data.date}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">At time: {data.time_out}</p>
                                    <div className="col-span-2 text-right mt-12">
                                        <button
                                            className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <p className="flex items-center justify-center">Checkout</p>
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create;
