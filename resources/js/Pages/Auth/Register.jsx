import {useEffect} from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import {Typography,} from "@material-tailwind/react";
import Footer from "@/Components/Footer.jsx";

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title="Register"/>
            <section className="m-5 flex">
                <div className="w-2/5 h-full hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        className="max-h-full max-w-full object-center rounded-3xl"
                    />
                </div>
                <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <Typography variant="h2" className="font-extrabold mb-4 text-3xl">Join Us Today</Typography>
                        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your
                            email and password to register.</Typography>
                    </div>
                    <form onSubmit={submit} className="mt-5 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Your name
                            </Typography>
                            <div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Your email
                            </Typography>
                            <div>
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2"/>
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
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Confirm Password
                            </Typography>
                            <div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton className="mt-6 w-full flex text-center justify-center">
                            Register Now
                        </PrimaryButton>
                        <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                            Already have an account?
                            <Link
                                href={route('login')}
                                className={"text-gray-900 ml-1"}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}
