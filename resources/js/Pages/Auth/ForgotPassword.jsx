import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';
import {Typography} from "@material-tailwind/react";

export default function ForgotPassword({status}) {
    const {data, setData, post, processing, errors} = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password"/>
            <section className="m-8 flex gap-4">
                <div className="w-full lg:w-3/5 mt-24">
                    <div className="text-center">
                        <Typography variant="h2" className="font-extrabold mb-4 text-3xl">Enter your email</Typography>
                        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                            Forgot your password? No problem. Just let us know your email address and we will email you
                            a password reset link that will allow you to choose a new one.
                        </Typography>
                        {status &&
                            <Typography variant="h5" color="blue-gray" className="text-lg font-medium text-green-600 dark:text-green-400">
                                    {status}
                            </Typography>
                        }
                    </div>
                    <form onSubmit={submit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2"/>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="mt-6 w-full flex text-center justify-center"
                                           disabled={processing}>
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
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
    )
        ;
}
