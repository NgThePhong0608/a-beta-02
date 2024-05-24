import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import React, { useEffect, useState } from "react";
import { useRoute } from "ziggy-js";
import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput";
import { REACT_APP_BASE_URL } from "@/constant";

const AccountTable = ({ auth, accounts, success, queryParams = null }) => {
    queryParams = queryParams ?? {};
    const [searchQuery, setSearchQuery] = useState('');
    const route = useRoute();

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };

    const deleteRecord = (account) => {
        if (!window.confirm('Are you sure you want to delete this record?')) {
            return;
        }
        router.delete(route('account.destroy', account.id));
    }

    const searchFieldChanged = (name, value) => {
        console.log(name, value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("account.index", queryParams));
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
        router.get(route("account.index", queryParams));
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (<>
        <div className="p-6 text-gray-900 dark:text-gray-100">
            {success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert">
                    {success}
                </div>)}

            <div className="mb-4 flex justify-end">
                <TextInput
                    name="search"
                    className="w-64"
                    defaultValue={queryParams.search}
                    placeholder="Type to search"
                    // value={queryParams.search}
                    onBlur={(e) => searchFieldChanged("search", e.target.value)}
                    onKeyPress={(e) => onKeyPress("search", e)}
                    onChange={(e) => handleSearchInputChange(e)}
                />
            </div>
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
                            Id
                        </TableHeading>

                        <th className="px-3 py-3">
                            Avatar
                        </th>
                        <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Name
                        </TableHeading>

                        <TableHeading
                            name="email"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Email
                        </TableHeading>

                        <TableHeading
                            name="role"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Role
                        </TableHeading>

                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Hired At
                        </TableHeading>
                        {checkRole(auth) && (<th className="px-3 py-2">
                            Actions
                        </th>)}
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <SelectInput
                                className="w-full"
                                defaultValue={queryParams.role}
                                onChange={(e) => searchFieldChanged("role", e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                            </SelectInput>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.data.map((account) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={account.id}
                        >
                            <td className="px-3 py-2">
                                {account.id}
                            </td>
                            <td className="px-3 py-2">
                                <Link
                                    href={route("account.show", account.id)}
                                    className="font-bold text-black dark:text-blue-500 hover:underline"
                                >
                                    <img
                                        src={account.avatar != null ? REACT_APP_BASE_URL + "/storage/" + account.avatar : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                                        className="h-10 w-10 rounded-full object-cover"
                                        alt="Employee Avatar"
                                    />
                                </Link>
                            </td>
                            <th className="px-3 py-2 text-gray-700 text-nowrap">
                                <Link
                                    href={route("account.show", account.id)}
                                    className="font-bold text-black dark:text-blue-500 hover:underline"
                                >
                                    {account.name}
                                </Link>
                            </th>
                            <td className="px-3 py-2">
                                {account.email}
                            </td>
                            <td className="px-3 py-2">
                                {account.role}
                            </td>
                            <td className="px-3 py-2">
                                {account.created_at}
                            </td>
                            {checkRole(auth) && (<td className="px-3 py-2 text-nowrap">
                                <div className="flex items-center space-x-1">
                                    <Link
                                        href={route("account.edit", account.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={(e) => deleteRecord(account)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                    <Link
                                        href={route('employee.index')}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </Link>
                                </div>
                            </td>)}
                        </tr>))}
                </tbody>
            </table>
        </div>
        <Pagination links={accounts.meta.links} />
    </>);
}

export default AccountTable;
