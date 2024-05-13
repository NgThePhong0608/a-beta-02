import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, notifications }) => {
    let element = [];
    for (let index = 0; index < notifications.length; index++) {
        element[index] = notifications[index];
    }

    const [showRead, setShowRead] = useState(false);

    const toggleTab = () => {
        setShowRead(!showRead);
    };

    const filteredNotifications = showRead ? element.filter(notification => notification.read_at) : element.filter(notification => !notification.read_at);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Notification</h2>
                        {
                            auth.user.role === 'admin' && (
                                <Link
                                    href={route("notification.create")}
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Add new
                                </Link>
                            )
                        }
                    </div>
                }
            >
                <Head title="Notification" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                            <div className="p-5">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={toggleTab}>{showRead ? 'Read' : 'Unread'}</button>
                                {/* <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={toggleTab}>Unread</button> */}
                            </div>

                            {filteredNotifications.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 dark:border-gray-700">
                                    <div className="p-4">
                                        <div className="flex items-center justify-between rounded-sm">
                                            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">{item.data[0].title}</h2>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.data[0].content}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.data[0].description}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(item.created_at).toLocaleDateString(
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
                                            {
                                                !item.read_at ? (
                                                    <div className="text-gray-500 dark:text-gray-400 mt-2">
                                                        <button>
                                                            <Link
                                                                method="post"
                                                                href={route("notification.mark-as-read", item.id)}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                Mark as read
                                                            </Link>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-500 dark:text-gray-400 mt-2">
                                                        <button>
                                                            <Link
                                                                href={route("notification.show", item.id)}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                View details
                                                            </Link>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default Index;