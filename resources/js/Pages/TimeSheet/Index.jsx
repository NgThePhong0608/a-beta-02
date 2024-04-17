import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
const Index = ({ auth, timesheets, success }) => {

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Timesheets
                    </h2>
                    {checkRole(auth) && (
                        <Link
                            href={route("timesheet.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Add new
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Timesheets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {
                                success && (
                                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                        {success}
                                    </div>
                                )
                            }
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Date</th>
                                        <th className="px-3 py-2">Checkin</th>
                                        <th className="px-3 py-2">Checkout</th>
                                        <th className="px-3 py-2">Duration</th>
                                        {checkRole(auth) && (
                                            <th className="px-3 py-2 text-right">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timesheets.data.map((timesheet) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={timesheet.id}
                                        >
                                            <td className="px-3 py-2">
                                                {timesheet.id}
                                            </td>
                                            <th className="px-3 py-2 text-gray-700 text-nowrap">
                                                {timesheet.employee.name}
                                            </th>
                                            <td className="px-3 py-2">
                                                {timesheet.date}
                                            </td>
                                            <td className="px-3 py-2">
                                                {timesheet.time_in}
                                            </td>
                                            <td className="px-3 py-2">
                                                {timesheet.time_out}
                                            </td>
                                            <td className="px-3 py-2">
                                                {timesheet.duration}
                                            </td>
                                            {checkRole(auth) && (
                                                <td className="px-3 py-2 text-nowrap text-right">
                                                    <Link
                                                        href={route(
                                                            "timesheet.edit",
                                                            timesheet.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteUser(timesheet)
                                                        }
                                                        method="delete"
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={timesheets.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
