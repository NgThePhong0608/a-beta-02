import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import React, { useEffect, useState } from "react";
import { useRoute } from "ziggy-js";
import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";

export const TimeSheetTable = ({ auth, timesheet, success, queryParams = null }) => {
    queryParams = queryParams ?? {};
    const [searchQuery, setSearchQuery] = useState('');
    const route = useRoute();

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };

    const deleteRecord = (timeSheet) => {
        if (!window.confirm('Are you sure you want to delete this record?')) {
            return;
        }
        router.delete(route('timesheet.destroy', timeSheet.id));
    }

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("timesheet.index", queryParams));
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
        router.get(route("timesheet.index", queryParams));
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
                        <th className="px-3 py-2">Name</th>
                        <TableHeading
                            name="date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Date
                        </TableHeading>
                        <TableHeading
                            name="time_in"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Checkin
                        </TableHeading>
                        <TableHeading
                            name="time_out"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Checkout
                        </TableHeading>
                        <TableHeading
                            name="duration"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Duration
                        </TableHeading>
                        <th className="px-3 py-2">Status</th>
                        {checkRole(auth) && (<th className="px-3 py-2 text-right">
                            Actions
                        </th>)}
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th className="px-3 py-2">
                            <TextInput
                                className="w-full"
                                defaultValue={queryParams.search}
                                placeholder="Type to search"
                                value={searchQuery}
                                onBlur={(e) => searchFieldChanged("search", e.target.value)}
                                onKeyPress={(e) => onKeyPress("search", e)}
                                onChange={(e) => handleSearchInputChange(e)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {timesheet.data.map((timeSheet) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={timeSheet.id}
                        >
                            <td className="px-3 py-2">
                                {timeSheet.id}
                            </td>
                            <th className="px-3 py-2 text-gray-700 text-nowrap">
                                {timeSheet.employee.name}
                            </th>
                            <td className="px-3 py-2">
                                {timeSheet.date}
                            </td>
                            <td className="px-3 py-2">
                                {timeSheet.time_in}
                            </td>
                            <td className="px-3 py-2">
                                {timeSheet.time_out}
                            </td>
                            <td className="px-3 py-2">
                                {timeSheet.duration}
                            </td>
                            <td className="px-3 py-2 text-black font-bold">
                                {timeSheet.status ?? 'Null'}
                            </td>
                            {checkRole(auth) && (<td className="px-3 py-2 text-nowrap text-right">
                                <Link
                                    href={route("timesheet.edit", timeSheet.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => deleteRecord(timeSheet)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                            </td>)}
                        </tr>))}
                </tbody>
            </table>
        </div>
        <Pagination links={timesheet.meta.links} />
    </>);
}
