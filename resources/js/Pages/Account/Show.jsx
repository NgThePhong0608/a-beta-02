import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

const Show = ({auth, account}) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Employee "${account.name}"`}
                </h2>
            }
        >
            <Head title={`Employee "${account.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className=" mt-2">
                                <div>
                                    <label className="font-bold text-lg">ID</label>
                                    <p className="mt-1">{account.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Name</label>
                                    <p className="mt-1">{account.name}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Email</label>
                                    <p className="mt-1">{account.email}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Role</label>
                                    <p className="mt-1">{account.role}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Updated At</label>
                                    <p className="mt-1">{account.updated_at}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Created At</label>
                                    <p className="mt-1">{account.created_at}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
