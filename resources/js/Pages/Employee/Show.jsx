import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

const Show = ({ auth, employee }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Employee "${employee.name}"`}
                </h2>
            }
        >
            <Head title={`Employee "${employee.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Employee ID</label>
                                        <p className="mt-1">{employee.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Employee Name</label>
                                        <p className="mt-1">{employee.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Employee Email</label>
                                        <p className="mt-1">{employee.user.email}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created At</label>
                                        <p className="mt-1">{new Date(employee.created_at).toISOString().slice(0, 10)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideUserColumn={true}
              />
            </div>
          </div>
        </div>
      </div> */}
        </AuthenticatedLayout>
    );
};

export default Show;
