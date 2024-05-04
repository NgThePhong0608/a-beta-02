import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { useState } from "react";

const Attendance = ({ auth, employee, timeSheets }) => {

    useEffect(() => {
        console.log(employee);
        console.log(timeSheets);
    });

    const checkRole = (auth) => {
        return auth.user.role === "admin";
    }

    const [selectedMonth, setSelectedMonth] = useState('');

    const filteredTimeSheets = timeSheets.data.filter(timesheet => {
        const timesheetMonth = new Date(timesheet.date).getMonth() + 1; // +1 because getMonth() returns zero-based month index
        return timesheetMonth.toString() === selectedMonth;
    });

    const renderTimeSheetRows = () => {
        return filteredTimeSheets.map((timesheet, index) => (
            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                <td className="px-6 py-4">{timesheet.date}</td>
                <td className="px-6 py-4">{timesheet.time_in}</td>
                <td className="px-6 py-4">{timesheet.time_out}</td>
                <td className="px-6 py-4">{timesheet.duration}</td>
                <td className="px-6 py-4">{timesheet.status ?? "Null"}</td>
                {
                    checkRole(auth) && (
                        <td className="px-6 py-4">
                            <Link href={route("timesheet.edit", timesheet.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                        </td>
                    )
                }
            </tr>
        ));
    };

    // Function to calculate total duration for the selected month
    const calculateTotalDurationForSelectedMonth = (selectedMonth) => {
        let totalDuration = 0;
        timeSheets.data.forEach(timesheet => {
            const month = new Date(timesheet.date).getMonth() + 1; // +1 because getMonth() returns zero-based month index
            if (month.toString() === selectedMonth) {
                const duration = parseFloat(timesheet.duration); // Convert duration to a floating point number
                if (!isNaN(duration)) { // Check if duration is a valid number
                    totalDuration += duration;
                }
            }
        });
        return totalDuration;
    };


    const renderTotalDurationForSelectedMonth = () => {
        const totalDuration = calculateTotalDurationForSelectedMonth(selectedMonth);
        return (
            <p>
                Total duration for {getMonthName(parseInt(selectedMonth))}: {totalDuration}h
            </p>
        );
    };

    const getMonthName = (monthNumber) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNumber - 1];
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        My Timesheet
                    </h2>
                    {checkRole(auth) && (
                        <Link
                            href={route("employee.index")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Back
                        </Link>
                    )}
                </div>
            }
        >
            <Head title={`My Timesheet`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white mt-5 p-5 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto rounded shadow-md sm:rounded-lg">
                            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                <option value="">Select Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Time in
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Time out
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Duration
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        {
                                            checkRole(auth) && (
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTimeSheetRows()}
                                </tbody>
                            </table>
                            <div className="text-xl font-bold p-4 text-black">
                                {renderTotalDurationForSelectedMonth()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Attendance;