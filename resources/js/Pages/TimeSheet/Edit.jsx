import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { REACT_APP_BASE_URL } from "@/constant";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

const Edit = ({ auth, timeSheet }) => {
    const { data, setData, post, errors } = useForm({
        name: timeSheet?.employee?.name || "",
        department: timeSheet?.employee?.department || "",
        date: timeSheet?.date || "",
        time_in: timeSheet?.time_in || "",
        time_out: timeSheet?.time_out || "",
        status: timeSheet?.status || "",
        _method: "PUT"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("timesheet.update", timeSheet.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                // <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                //     Checkout
                // </h2>
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <Link href={route('timesheet.index')} class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                {/* <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg> */}
                                Timesheet
                            </Link>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{timeSheet.id}</a>
                            </div>
                        </li>
                    </ol>
                </nav>

            }
        >
            <Head title="Timesheets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center justify-center rounded-sm">
                                <img
                                    src={timeSheet.employee.user.avatar != null ? REACT_APP_BASE_URL + "/storage/" + timeSheet.employee.user.avatar : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                                    className="mt-5 mb-5 w-32 h-32 rounded-full object-cover"
                                    alt="Employee Avatar"
                                />
                            </div>
                            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <InputLabel htmlFor="name" value="Employee User Name" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("name", e.target.value)}
                                            disabled
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <InputLabel htmlFor="department" value="Department" />

                                        <TextInput
                                            id="department"
                                            type="text"
                                            name="department"
                                            value={data.department}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("department", e.target.value)}
                                            disabled
                                        />

                                        <InputError message={errors.department} className="mt-2" />
                                    </div>

                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <InputLabel htmlFor="date" value="Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("date", e.target.value)}
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <InputLabel htmlFor="time_in" value="Time in" />
                                    <TextInput
                                        id="time_in"
                                        type="time"
                                        name="time_in"
                                        value={data.time_in}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("time_in", e.target.value)}
                                    />
                                    <InputError message={errors.time_in} className="mt-2" />
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <InputLabel htmlFor="time_out" value="Time out" />
                                    <TextInput
                                        id="time_out"
                                        type="time"
                                        name="time_out"
                                        value={data.time_out}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("time_out", e.target.value)}
                                    />
                                    <InputError message={errors.time_out} className="mt-2" />
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <InputLabel htmlFor="status" value="Status" />
                                    <TextInput
                                        id="status"
                                        type="text"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("status", e.target.value)}
                                    />
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit;
