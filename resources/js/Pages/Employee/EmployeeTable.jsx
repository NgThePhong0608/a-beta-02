import React, { useEffect, useState } from "react";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { REACT_APP_BASE_URL } from "@/constant";

const EmployeeTable = ({ auth, employees, queryParams = null, success }) => {
    queryParams = queryParams || {};
    useEffect(() => {

    }, []);
    const [searchQuery, setSearchQuery] = useState('');
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
            setSearchQuery(value);
        } else {
            delete queryParams[name];
        }

        router.get(route("employee.index", queryParams));
    };

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };

    const sortChanged = (name) => {
        if (queryParams.sort_field === name) {
            if (queryParams.sort_direction === "desc") {
                queryParams.sort_direction = "asc";
            } else {
                queryParams.sort_direction = "desc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("employee.index", queryParams));
    };

    const deleteEmployee = (employee) => {
        if (!window.confirm("Are you sure you want to delete the employee?")) {
            return;
        }
        router.delete(route("employee.destroy", employee.id));
    };

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleResetPassword = (employee) => {
        if (!window.confirm("Are you sure you want to reset the password, it will reset to default password?")) {
            return;
        }
        router.put(route("employee.reset-password", employee.id));
    }

    const checkPermission = (employee) => {
        return auth.user.role != 'admin' && auth.user.id === employee.user.id;
    }

    return (
        <>
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                </div>
            )}

            <div className="mb-3 p-4 flex justify-end">
                <TextInput
                    name="search"
                    className="w-64"
                    defaultValue={queryParams.search}
                    placeholder="Type to search"
                    onBlur={(e) => searchFieldChanged("search", e.target.value)}
                    onKeyPress={(e) => onKeyPress("search", e)}
                    onChange={(e) => handleSearchInputChange(e)}
                />
            </div>

            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-3">Image</th>
                            <TableHeading
                                name="fullname"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>
                            <th className="px-3 py-3">Email</th>
                            <TableHeading
                                name="age"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Age
                            </TableHeading>
                            <TableHeading
                                name="department"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Department
                            </TableHeading>
                            <TableHeading
                                name="phone"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Phone
                            </TableHeading>
                            <th className="px-3 py-2">Address</th>
                            <TableHeading
                                name="city"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                City
                            </TableHeading>
                            <TableHeading
                                name="country"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Country
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Create Date
                            </TableHeading>
                            {checkRole(auth) && (
                                <th className="px-3 py-2 text-center">
                                    Actions
                                </th>
                            )}
                            {checkPermission(auth) && (
                                <th className="px-3 py-2 text-center">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-5 py-3">
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.department}
                                    onChange={(e) => searchFieldChanged("department", e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    <option value="HADES">Hades</option>
                                    <option value="FADERLESS">Faderless</option>
                                    <option value="WARRIOR">Warrior</option>
                                    <option value="PHOENIX">Phoenix</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.data.map((employee) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={employee.id}
                            >
                                <td className="px-3 py-2">{employee.id}</td>
                                <td className="px-3 py-2">
                                    <img className="h-10 w-10 rounded-full object-cover"
                                        src={employee.user.avatar != null ? REACT_APP_BASE_URL + "/storage/" + employee.user.avatar :
                                            "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                                        alt={employee.fullname} />
                                </td>
                                <th className="px-5 py-3 text-black-100 text-nowrap hover:underline">
                                    <Link href={route("employee.show", employee.id)}>{employee.name}</Link>
                                </th>
                                <td className="px-3 py-2">{employee.user.email}</td>
                                <td className="px-3 py-2">{employee.age}</td>
                                <td className="px-3 py-2">{employee.department}</td>
                                <td className="px-3 py-2">{employee.phone}</td>
                                <td className="px-3 py-2">{employee.address}</td>
                                <td className="px-3 py-2">{employee.city}</td>
                                <td className="px-3 py-2">{employee.country}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    {new Date(employee.created_at).toLocaleDateString(
                                        'en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false
                                    }
                                    )}
                                </td>
                                {
                                    checkRole(auth) && (
                                        <td className="px-3 py-2 text-nowrap">
                                            <div className="flex items-center space-x-1">
                                                <Link
                                                    href={route("employee.edit", employee.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteEmployee(employee)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => handleResetPassword(employee)}
                                                    className="font-medium hover:underline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    )
                                }
                                {
                                    checkPermission(employee) && (
                                        <td className="px-3 py-2 text-nowrap">
                                            <div className="flex items-center space-x-1">
                                                <Link
                                                    href={route("employee.edit", employee.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteEmployee(employee)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={employees.meta.links} />
        </>
    );
};

export default EmployeeTable;
