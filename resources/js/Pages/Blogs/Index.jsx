import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Blogs from "@/Components/Blogs";
const Index = ({ blogs, auth }) => {
    const { props } = usePage();
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Blogs
                </h2>
            }
        >
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* {props.flash.success && (
                    <div className="alert">{props.flash.success}</div>
                )} */}
                <Link
                    className="border rounded-md px-4 py-2 text-white hover:text-gray-800 hover:bg-white transition-all duration-300"
                    href="/blogs/create"
                >
                    Create New Blog
                </Link>

                <Blogs blogs={blogs} auth={auth}/>
            </div>
        </Authenticated>
    );
};

export default Index;
