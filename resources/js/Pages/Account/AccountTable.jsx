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
                        {checkRole(auth) && (<th className="px-3 py-2 text-right">
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
                            {checkRole(auth) && (<td className="px-3 py-2 text-nowrap text-right">
                                <Link
                                    href={route("account.edit", account.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => deleteRecord(account)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                            </td>)}
                        </tr>))}
                </tbody>
            </table>
        </div>
        <Pagination links={accounts.meta.links} />
    </>);
}

export default AccountTable;
