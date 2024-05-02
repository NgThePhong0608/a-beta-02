import React, {useEffect, useState} from "react";
import TableHeading from "@/Components/TableHeading";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";

const AccountTable = ({auth, accounts, queryParams = null, success}) => {
    queryParams = queryParams || {};
    const [searchQuery, setSearchQuery] = useState('');
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
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
        router.get(route("account.index", queryParams));
    };

    const deleteAccount = (account) => {
        if (!window.confirm("Are you sure you want to delete the account?")) {
            return;
        }
        router.delete(route("account.destroy", account.id));
    };

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
        <>
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                </div>
            )}
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
                        <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Username
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
                            Created at
                        </TableHeading>
                        {checkRole(auth) && (
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
                        <th className="px-3 py-3">
                            <TextInput
                                className="w-full"
                                defaultValue={queryParams.search}
                                placeholder="Type to search"
                                value={searchQuery}
                                onBlur={(e) => searchFieldChanged("search", e.target.value)}
                                onKeyPress={(e) => onKeyPress("search", e)}
                                onChange={handleSearchInputChange}
                            />
                        </th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.data.map((account) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={account.id}
                        >
                            <td className="px-3 py-2">{account.id}</td>
                            <th className="px-5 py-3 text-black-100 text-nowrap hover:underline">
                                <Link href={route("account.show", account.id)}>{account.name}</Link>
                            </th>
                            <td className="px-3 py-2">{account.email}</td>
                            <td className="px-3 py-2">{account.role}</td>
                            <td className="px-3 py-2 text-nowrap">
                                {account.created_at}
                            </td>
                            {
                                checkRole(auth) && (
                                    <td className="px-3 py-2 text-nowrap text-center">
                                        <Link
                                            href={route("account.edit", account.id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={(e) => deleteAccount(account)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={accounts.meta.links}/>
        </>
    );
};

export default AccountTable;
