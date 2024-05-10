import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput.jsx";
import { REACT_APP_BASE_URL } from "@/constant";

const Edit = ({ auth, account }) => {

    const { data, setData, post, errors, reset } = useForm({
        name: account.name || "",
        email: account.email || "",
        role: account.role || "",
        avatar: account.avatar || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("account.update", account.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Account "{data.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg my-0 mx-auto"
                        >
                            <div className="flex items-center flex-col">
                                <div className="flex items-center justify-center rounded-sm">
                                    <img
                                        src={account.avatar != null ? REACT_APP_BASE_URL + "/storage/" + account.avatar : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                                        className="mt-5 w-40 h-40 rounded-full object-cover"
                                        alt="Employee Avatar"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="avatar" value="Avatar" />

                                    <TextInput
                                        type="file"
                                        // defaultValue={data.avatar}
                                        className="mt-1 block w-72"
                                        id="avatar"
                                        name="avatar"
                                        onChange={(e) => setData("avatar", e.target.files[0])}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="Name" />

                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-72"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-72"
                                        onChange={(e) => setData("email", e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="role"
                                        value="Role"
                                    />

                                    <SelectInput
                                        name="role"
                                        id="role"
                                        className="mt-1 block w-72"
                                        defaultValue={data.role}
                                        onChange={(e) => setData("role", e.target.value)}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </SelectInput>

                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 ">
                                    <Link
                                        href={route("account.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
