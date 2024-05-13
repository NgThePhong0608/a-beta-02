import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { REACT_APP_BASE_URL } from '@/constant';
import { BellIcon } from '@heroicons/react/24/solid';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center flex-shrink-0">
                                <Link href="/">
                                    <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                                        href="#" aria-label="Amela">
                                        <img className="h-20 w-auto"
                                            src='http://localhost:8000/storage/hrm.png'
                                            alt="AMELA Technology" decoding="async"></img>
                                    </a>
                                </Link>
                            </div>

                            <div className="hidden sm:flex sm:space-x-8 sm:ml-10">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>

                                <NavLink href={route('employee.index')} active={route().current('employee.index')}>
                                    Employee
                                </NavLink>
                                {
                                    user.role === 'admin' ? (
                                        <>
                                            <NavLink href={route('account.index')}
                                                active={route().current('account.index')}>
                                                Account
                                            </NavLink>
                                            <NavLink href={route('timesheet.index')}
                                                active={route().current('timesheet.index')}>
                                                Timesheet
                                            </NavLink>
                                            <NavLink href={route('notification.index')}
                                                active={route().current('notification.index')}>
                                                Notification
                                            </NavLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink href={route('checkin')} active={route().current('checkin')}>
                                                Attendance
                                            </NavLink>

                                            <NavLink href={route('attendance')} active={route().current('attendance')}>
                                                My Attendance
                                            </NavLink>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {
                                user.role === 'employee' && (
                                    <div className='ms-3 relative'>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <Link href={route('notification.index')}
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <BellIcon className="h-5 w-5" />
                                                    </Link>
                                                </span>
                                            </Dropdown.Trigger>
                                        </Dropdown>
                                    </div>
                                )
                            }
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </div>
                                                <img className="w-10 h-10 rounded-full m-4 object-cover"
                                                    src={user.avatar != null ? REACT_APP_BASE_URL + "/storage/" + user.avatar :
                                                        "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                                                    alt="" />
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('employee.index')} active={route().current('employee.index')}>
                            Employee
                        </ResponsiveNavLink>
                        {
                            user.role === 'admin' ? (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <ResponsiveNavLink href={route('timesheet.index')}
                                        active={route().current('timesheet.index')}>
                                        Timesheet
                                    </ResponsiveNavLink>
                                </div>
                            ) : (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <ResponsiveNavLink href={route('checkin')} active={route().current('checkin')}>
                                        Attendance
                                    </ResponsiveNavLink>
                                </div>
                            )
                        }
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
