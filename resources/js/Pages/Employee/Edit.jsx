import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput.jsx";

const Edit = ({ auth, employee }) => {

    const { data, setData, post, errors, reset } = useForm({
        name: employee.user.name || "",
        avatar: employee.user.avatar || "",
        email: employee.user.email || "",
        fullname: employee.name || "",
        age: employee.age,
        phone: employee.phone || "",
        address: employee.address || "",
        city: employee.city || "",
        country: employee.country || "",
        department: employee.department || "",
        _method: "PUT",
    });

    useEffect(() => {
        console.log(data.avatar);
    }, [data.avatar])

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("employee.update", employee.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Employee "{data.fullname}"
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
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg grid grid-cols-2 gap-4"
                        >
                            <div className="col-span-2 sm:col-span-1">
                                <div className="col-span-2 sm:col-span-1">
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="avatar">Upload image</label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="avatar"
                                            id="avatar"
                                            type="file"
                                            name="avatar"
                                            onChange={(e) => setData("avatar", e.target.files[0])}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="Employee User Name" />

                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_full_name"
                                        value="Employee Full Name"
                                    />

                                    <TextInput
                                        id="user_full_name"
                                        type="text"
                                        name="fullname"
                                        value={data.fullname}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("fullname", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.fullname}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="age" value="Age" />

                                    <TextInput
                                        id="age"
                                        type="text"
                                        name="age"
                                        value={data.age}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("age", e.target.value)}
                                    />

                                    <InputError message={errors.age} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="user_email" value="Employee Email" />

                                    <TextInput
                                        id="user_email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("email", e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>

                            <div className="col-span-2 sm:col-span-1">

                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Phone" />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("phone", e.target.value)}
                                    />

                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address" />

                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("address", e.target.value)}
                                    />

                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="city" value="City" />

                                    <TextInput
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("city", e.target.value)}
                                    />

                                    <InputError message={errors.city} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="country" value="Country" />

                                    <TextInput
                                        id="country"
                                        type="text"
                                        name="country"
                                        value={data.country}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("country", e.target.value)}
                                    />

                                    <InputError message={errors.country} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="department" value="Department" />

                                    <SelectInput
                                        name="department"
                                        id="department"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("department", e.target.value)}
                                    >
                                        <option value="">{employee.department}</option>
                                        <option value="HADES">Hades</option>
                                        <option value="FADERLESS">Faderless</option>
                                        <option value="WARRIOR">Warrior</option>
                                        <option value="PHOENIX">Phoenix</option>
                                    </SelectInput>

                                    <InputError message={errors.department} className="mt-2" />
                                </div>
                            </div>

                            <div className="col-span-2 text-right">
                                <Link
                                    href={route("employee.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
