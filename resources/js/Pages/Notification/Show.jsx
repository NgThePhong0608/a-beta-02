import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Show = ({ auth, notification }) => {
    console.log(notification);
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="flex items-center justify-between">
                        <Link
                            href={route("notification.index")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Back
                        </Link>
                    </div>
                }
            >
                <Head title="Notification Details" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                            <div className="container mx-auto px-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 m-3">Notifications</h2>
                                </div>
                                <div className="mt-4">
                                    <div className="border-b border-gray-200 dark:border-gray-700">
                                        <div className="p-4">
                                            <div className="flex items-center justify-between rounded-sm">
                                                <h2 className="p-3 m-3 font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">{notification.data[0].title}</h2>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{notification.data[0].content}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{notification.data[0].description}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(notification.created_at).toLocaleDateString(
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default Show;