import React, {useEffect, useState} from "react";
import TableHeading from "@/Components/TableHeading";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

const EmployeeTable = ({auth, employees, queryParams = null, success}) => {
    queryParams = queryParams || {};
    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredTimesheetData, setFilteredTimesheetData] = useState([]);

    // useEffect(() => {
    //     const lowerCaseQuery = searchQuery.toLowerCase();
    //     const filteredData = employees.data.filter((employee) => {
    //         return (
    //             employee?.user?.email.toLowerCase().includes(lowerCaseQuery)
    //         );
    //     });
    //     setFilteredTimesheetData(filteredData);
    // }, [searchQuery, employees.data]);

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
                            <th className="px-3 py-2 text-right">
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
                                <img src={employee.image_url} alt={employee.fullname} />
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
                                        <Link
                                            href={route("employee.edit", employee.id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={(e) => deleteEmployee(employee)}
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
            <Pagination links={employees.meta.links}/>
        </>
    );
};

export default EmployeeTable;
