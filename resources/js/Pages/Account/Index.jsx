import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";
import AccountTable from "@/Pages/Account/AccountTable.jsx";

const Index = ({ auth, accounts, queryParams = null, success }) => {
    const checkRole = (auth) => {
        return auth.user.role === "admin";
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Account
                    </h2>
                    {checkRole(auth) && (
                        <Link
                            href={route("account.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Add new
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <AccountTable auth={auth} queryParams={queryParams} accounts={accounts} success={success}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;