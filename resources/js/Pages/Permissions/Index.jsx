import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Index = ({ auth }) => {
    const { data, setData, post, errors } = useForm({
        create_employee: false,
        update_employee: false,
        delete_employee: false,
        create_timesheet: false,
        update_timesheet: false,
        delete_timesheet: false,
        send_notification: false,
    })

    useEffect(() => {
        console.log(data);
    })

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Account
                    </h2>
                </div>
            }
        >
            <Head title="Permission" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-xl font-bold m-4">Permission</h1>
                            <div className="relative overflow-x-auto">
                                <form action="">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Permission
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Employee
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Timesheet
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Notification
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Create
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('create_employee', e.target.value = true)} id="create_employee" name="create_employee" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="create_employee" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('create_timesheet', e.target.value)} id="create_timesheet" name="create_timesheet" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="create_timesheet" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Update
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('update_employee', e.target.value)} id="update_employee" name="update_employee" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="update_employee" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('update_timesheet', e.target.value)} id="update_timesheet" name="update_timesheet" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="update_timesheet" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                </td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Delete
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('delete_employee', e.target.value)} id="delete_employee" name="delete_employee" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="delete_employee" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('delete_timesheet', e.target.value)} id="delete_timesheet" name="delete_timesheet" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="delete_timesheet" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                </td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Send
                                                </th>
                                                <td className="px-6 py-4">

                                                </td>
                                                <td className="px-6 py-4">

                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => setData('send_notification', e.target.value)} id="send_notification" name="send_notification" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="send_notification" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
