import { Link, usePage } from "@inertiajs/react";
import React from "react";

const GuestHeader = ({ auth }) => {
    const { url } = usePage()
    return (
        <header className="flex items-center gap-2 py-10 lg:justify-between lg:grid-cols-3">
            <div className="flex lg:justify-center ">
                <h1 className="text-3xl text-white">
                    Nex<span className="font-bold">Blog</span>{" "}
                </h1>
            </div>
            <nav className="flex justify-end flex-1 -mx-3 text-xs md:text-lg">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className={`${auth.user && 'font-extrabold'} font-light rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white`}
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={"/"}
                            className={`${url === '/' ? 'font-extrabold' : 'font-light'} rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white`}
                        >
                            Home
                        </Link>
                        <Link
                            href={"/explore-blogs"}
                            className={`${url === '/explore-blogs' ? 'font-extrabold' : 'font-light'} rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white`}
                        >
                            Blogs
                        </Link>
                        <Link
                            href={route("login")}
                            className={`${url === '/login' && 'font-extrabold'} font-light rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white`}
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="rounded-md px-3 py-2 text-black ring-1 font-light ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default GuestHeader;
