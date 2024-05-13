import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react';
import { TimeSheetTable } from "@/Pages/TimeSheet/TimeSheetTable.jsx";
const Index = ({ auth, timesheet, success, queryParams = null }) => {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Timesheets
                    </h2>
                </div>
            }
        >
            <Head title="Timesheets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <TimeSheetTable auth={auth} timesheet={timesheet} success={success} queryParams={queryParams} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
