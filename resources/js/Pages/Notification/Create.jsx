import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        title: "",
        description: "",
        content: "",
        user: "",
        sendDate: "",
        sendTime: ""
    });

    const submit = (e) => {
        post(route('notification.store'));
    }
    console.log(data);
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Notification</h2>
                        <Link href={route('notification.index')}>Back</Link>
                    </div>
                }
            >
                <Head title="Create Notification" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                            <form onSubmit={submit}>
                                <div className="p-4">
                                    <div className="mb-4">
                                        <InputLabel label="User" name="user" type="select" htmlFor="user" />
                                        <SelectInput
                                            id="user"
                                            name="user"
                                            className="w-full"
                                            // value={data.user}
                                            onChange={(e) => setData("user", e.target.value)}
                                        >
                                            <option value="">Select Option</option>
                                            <option value="HADES">Hades</option>
                                            <option value="FADERLESS">Faderless</option>
                                            <option value="WARRIOR">Warrior</option>
                                            <option value="PHOENIX">Phoenix</option>
                                            <option value="ALL">All employee</option>
                                        </SelectInput>
                                        <InputError message={errors.user} className="mt-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                                        <input type="text" name="title" id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                                        <input name="description" id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Content</label>
                                        <textarea name="content" id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="sendDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Send Date</label>
                                        <input type="date" name="sendDate" id="sendDate"
                                            value={data.sendDate}
                                            onChange={(e) => setData('sendDate', e.target.value)}
                                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="sendTime" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Send Time</label>
                                        <input type="time" name="sendTime" id="sendTime"
                                            value={data.sendTime}
                                            onChange={(e) => setData('sendTime', e.target.value)}
                                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}

export default Create;