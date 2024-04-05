import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

const Index = ({ auth, employees, success }) => {
    const deleteUser = (employee) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            router.delete(route("employee.destroy", employee.id));
        }
    };

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Employees
                    </h2>
                    {checkRole(auth) && (
                        <Link
                            href={route("employee.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Add new
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Employees" />

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
                                        <th className="px-3 py-2">Email</th>
                                        <th className="px-3 py-2">Age</th>
                                        <th className="px-3 py-2">Phone</th>
                                        <th className="px-3 py-2">Address</th>
                                        <th className="px-3 py-2">City</th>
                                        <th className="px-3 py-2">Country</th>
                                        <th className="px-3 py-2">
                                            Department
                                        </th>
                                        <th className="px-3 py-2">
                                            Create Date
                                        </th>

                                        {checkRole(auth) && (
                                            <th className="px-3 py-2 text-right">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                        </th>
                                        <th className="px-3 py-2">
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {employees.data.map((employee) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={employee.id}
                                        >
                                            <td className="px-3 py-2">
                                                {employee.id}
                                            </td>
                                            <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                <Link
                                                    href={route(
                                                        "employee.show",
                                                        employee.id
                                                    )}
                                                    className="font-medium text-black text-nowrap hover:underline"
                                                >
                                                    {employee.name}
                                                </Link>
                                            </th>
                                            <td className="px-3 py-2">
                                                {employee.user.email}
                                            </td>
                                            <td className="px-3 py-2">
                                                {employee.age}
                                            </td>
                                            <td className="px-3 py-2">
                                                {employee.phone}
                                            </td>
                                            <td className="px-3 py-2">
                                                {employee.address}
                                            </td>
                                            <td className="px-3 py-2">
                                                {employee.city}
                                            </td>
                                            <td className="px-3 py-2">
                                                {employee.country}
                                            </td>
                                            <td className="px-3 py-2">
                                                {employee.department}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {new Date(employee.created_at).toISOString().slice(0, 10)}
                                            </td>
                                            {checkRole(auth) && (
                                                <td className="px-3 py-2 text-nowrap text-right">
                                                    <Link
                                                        href={route(
                                                            "employee.edit",
                                                            employee.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteUser(employee)
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
                        <Pagination links={employees.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
