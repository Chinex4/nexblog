import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

const Show = ({ blog, auth }) => {
    const { delete: destroy } = useForm();
    const handleDelete = (e) => {
        e.preventDefault();

        if (confirm("Are you sure you want to delete this blog?")) {
            destroy(`/blogs/${blog.id}`, {
                onSuccess: () => alert("Blog deleted successfully!"),
            });
        }
    };

    const handleShare = (e) => {
        e.preventDefault();
        const shareUrl = `${window.location.origin}/blogs/${blog.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Blog link copied to clipboard!");
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight uppercase">
                    Blog {blog.title}
                </h2>
            }
        >
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 text-white space-y-6">
                <h1 className="text-xl lg:text-3xl uppercase font-bold">
                    {blog.title}
                </h1>
                <p className="leading-[25px]">{blog.body}</p>
                <p>By {blog.user.name}</p>
                <small>Created at {blog.created_at}</small>
                <div className="space-x-3">
                    <Link
                        href="/blogs"
                        className="bg-slate-600 rounded px-4 py-2 hover:bg-slate-600/50 transition-all duration-300"
                    >
                        Go Back
                    </Link>
                    <Link
                        href=""
                        onClick={handleShare}
                        className="bg-green-600 rounded px-4 py-2 hover:bg-green-600/50 transition-all duration-300"
                    >
                        Share
                    </Link>
                    {auth.user.id === blog.user_id && (
                        <>
                            <Link
                                href={`/blogs/${blog.id}/edit`}
                                className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-600/50 transition-all duration-300"
                            >
                                Edit
                            </Link>
                            <Link
                                href=""
                                onClick={handleDelete}
                                className="bg-red-600 rounded px-4 py-2 hover:bg-red-600/50 transition-all duration-300"
                            >
                                Delete
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
