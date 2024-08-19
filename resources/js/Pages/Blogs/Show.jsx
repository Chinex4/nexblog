import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import DeleteBlogPost from "./Partials/DeleteBlogPost";

const Show = ({ blog, auth }) => {
    const { delete: destroy } = useForm();
    const handleDelete = (e) => {
        e.preventDefault();

        if (confirm("Are you sure you want to delete this blog?")) {
            destroy(route("blogs.destroy"), {
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
            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-6">
                <div className="overflow-hidden">
                    <img
                        className="rounded-md"
                        src={
                            blog.image
                                ? `../../storage/${blog.image}`
                                : "../../images/default-blog.jpg"
                        }
                        alt="blog-image"
                    />
                </div>
                <h1 className="text-xl lg:text-3xl uppercase font-bold">
                    {blog.title}
                </h1>
                <p className="leading-[25px]">{blog.body}</p>
                <p>By {blog.user.name}</p>
                <small>Created at {blog.created_at}</small>
                <div className="space-x-3">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center px-4 py-2 bg-slate-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-500/25 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Go Back
                    </Link>
                    <Link
                        href=""
                        onClick={handleShare}
                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500/25 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Share
                    </Link>
                    {auth.user.id === blog.user_id && (
                        <>
                            <Link
                                href={`/blogs/${blog.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500/25 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150ion-300"
                            >
                                Edit
                            </Link>
                            <div className="inline-block">
                                <DeleteBlogPost
                                    className="max-w-xl"
                                    blog={blog}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
