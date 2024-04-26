import {useEffect} from 'react';
import {Head, Link, useForm} from '@inertiajs/react';
import {Typography} from "@material-tailwind/react";
import {route} from "ziggy-js";
import Checkbox from "@/Components/Checkbox.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in"/>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <section className="m-8 flex gap-4">
                <div className="w-full lg:w-3/5 mt-24">
                    <div className="text-center">
                        <Typography variant="h2" className="font-extrabold mb-4 text-3xl">Sign In</Typography>
                        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your
                            email and password to Sign In.</Typography>
                    </div>
                    <form onSubmit={submit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Your email
                            </Typography>
                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full !border-t-blue-gray-200 focus:!border-t-gray-900 before:content-none after:content-none"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Password
                            </Typography>
                            <div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full  !border-t-blue-gray-200 focus:!border-t-gray-900 before:content-none after:content-none"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                            </label>
                        </div>
                        <PrimaryButton className="mt-6 w-full flex text-center justify-center" disabled={processing}>
                            <p className="text-center">Log in</p>
                        </PrimaryButton>
                        <div className="flex items-center justify-between gap-2 mt-6">
                            <div></div>
                            <Typography variant="small" className="font-medium text-gray-900">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </Typography>
                        </div>
                        <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                            Not registered?
                            <Link
                                href={route('register')}
                                className="text-gray-700 ml-1"
                            >
                                Create account
                            </Link>
                            <Link to={route('register')} className=""></Link>
                        </Typography>
                    </form>
                </div>
                <div className="w-2/5 hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        className="max-h-full max-w-full object-center rounded-3xl"
                    />
                </div>
            </section>
        </>
    );
}
