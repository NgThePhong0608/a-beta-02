import { Link, Head } from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
                <nav class="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto" aria-label="Global">
                    <div class="md:col-span-3">
                        <a class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Amela">
                            <img className="h-20 w-auto" src="https://static.vecteezy.com/system/resources/previews/007/263/716/non_2x/hrm-letter-logo-design-on-white-background-hrm-creative-initials-letter-logo-concept-hrm-letter-design-vector.jpg" alt="AMELA Technology" decoding="async"></img>
                        </a>
                    </div>
                    <div class="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="absolute -inset-0.5"></span>
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>

                                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative ml-3">
                                    <div>
                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('login')}
                                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm"
                                                >
                                                    Log in
                                                </Link>

                                                <Link
                                                    href={route('register')}
                                                    className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6">
                    </div>
                </nav>
            </header>

            <main>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Our Website</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget libero nec dui vestibulum aliquam ac et velit. Fusce scelerisque eros eu lectus facilisis, in malesuada urna tincidunt. Integer rutrum est non aliquet pharetra. Duis in faucibus mauris. Cras feugiat dui nec semper sagittis. Proin pretium, purus id varius luctus, nisl tortor volutpat felis, a euismod enim purus sit amet purus. Vivamus et libero nec urna accumsan consequat. Quisque sed libero odio. Donec tristique nisi vel libero dictum, vel bibendum eros vulputate. Proin efficitur a odio at lobortis. Suspendisse potenti. Morbi lobortis urna id ante egestas, et eleifend libero pulvinar. Sed ac felis ut urna placerat luctus. Nulla a erat in elit consectetur tincidunt.</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Phasellus in tempor dui, id consequat eros. In id fermentum libero. Ut hendrerit justo sit amet purus accumsan, vitae egestas sapien blandit. Mauris id interdum ligula, at vulputate libero. Integer feugiat velit nec sapien ultricies dignissim. Nulla posuere, lorem id fermentum vestibulum, dolor justo fermentum velit, at molestie risus justo vitae sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis non ex id ante mattis faucibus sed ut velit. Nam vel magna quis enim tempus dapibus. Nulla facilisi.</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ut ex at lorem tristique lacinia. Vestibulum id massa in nisi consectetur bibendum non at ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Curabitur pulvinar posuere odio, eget ultricies libero consequat ac. Sed auctor, est quis iaculis tincidunt, mi nisi laoreet elit, at convallis risus sem nec libero. Phasellus ut venenatis nibh, eu tempor nunc. Vivamus in ex id nisl vehicula congue a sit amet erat. Vivamus aliquet eleifend libero, vel consequat nisi gravida ut.</p>
                </div>
            </main>

            <Footer />
        </>
    );
}
