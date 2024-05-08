import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { REACT_APP_BASE_URL } from '../../constant';
import Empty from "@/Components/Empty";

const Show = ({ auth, employee, timeSheets }) => {
    useEffect(() => {
        console.log(REACT_APP_BASE_URL + "/storage/" + employee.user.avatar);
        console.log(timeSheets.data.length);
        console.log('employee', employee);
    })
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
                        {`Employee "${employee.name}"`}
                    </h2>
                    <Link
                        href={route("employee.index")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title={`Employee "${employee.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-center rounded-sm">
                            <img
                                src={employee.user.avatar != null ? REACT_APP_BASE_URL + "/storage/" + employee.user.avatar : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                                className="mt-5 w-32 h-32 rounded-full object-cover"
                                alt="Employee Avatar"
                            />
                        </div>

                        <form class="max-w-md mx-auto">
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={employee.user.email} type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" value={employee.name} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={new Date(employee.created_at).toISOString().slice(0, 10)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hired date</label>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" value={employee.department} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" value={employee.user.role} name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Role</label>
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="tel" value={employee.phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" value={`${employee.address} - ${employee.city} - ${employee.country}`} name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                </div>
                            </div>
                        </form>

                    </div>
                    {
                        timeSheets.data.length > 0 ? (
                            <div className="bg-white mt-5 p-5 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <h1 className="font-bold">Timesheet</h1>
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
                        )
                            : <Empty title="Timesheet" description="No record found" />
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
