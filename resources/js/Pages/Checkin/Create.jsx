import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import React from "react";

const Create = ({auth}) => {
    const time = new Date();
    const formattedTime = [
        ('0' + time.getHours()).slice(-2),
        ('0' + time.getMinutes()).slice(-2),
        ('0' + time.getSeconds()).slice(-2)
    ].join(':');

    const {data, setData, post, errors, reset} = useForm({
        time_in: formattedTime,
        date: time.toISOString().slice(0, 10),
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post('/checkin');
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Checkin
                </h2>
            }
        >
            <Head title="Timesheets"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <div className=" flex items-center justify-center p-6 text-gray-900 dark:text-gray-100">
                            <div
                                className="max-w-[400px] p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <form onSubmit={onSubmit}>
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Checkin date: {data.date}</h5>
                                    </a>
                                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">At time: {data.time_in}</p>
                                    <div className="col-span-2 text-right mt-12">
                                        <button
                                            className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <p className="flex items-center justify-center">Checkin</p>
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
