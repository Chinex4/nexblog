import { Link } from "@inertiajs/react";
import React from "react";

const Blogs = ({ blogs, auth }) => {
    // console.log(blogs.image);
    return (
        <>
            {blogs ? (
                <ul className="mt-10 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {blogs.data.map((blog) => (
                        <li
                            className="border px-6 py-8 rounded-lg space-y-4"
                            key={blog.id}
                        >
                            <div className="h-44 overflow-hidden">
                                <img
                                    className="rounded-md"
                                    src={
                                        blog.image
                                            ? `/storage/${blog.image}`
                                            : "/images/default-blog.jpg"
                                    }
                                    alt="blog-image"
                                />
                            </div>
                            <h1 className="text-xl font-bold truncate capitalize">
                                {blog.title}
                            </h1>
                            <p className="text-xs truncate">{blog.body}</p>
                            <Link href={route('profile.show', blog.user)} className="flex space-x-3 items-center">
                                <span>By {blog.user.name}</span>
                                <span className="size-6 grid place-items-center border border-gray-300 overflow-hidden rounded-full">
                                    <img
                                        src={
                                            blog.user.image
                                                ? `/storage/${blog.user.image}`
                                                : "/images/default-profile.jpg"
                                        }
                                        alt="profile image"
                                    />
                                </span>
                            </Link>
                            {auth.user && (
                                <>
                                    <Link
                                        className="inline-block rounded-lg mt-8 bg-blue-500 px-4 py-2"
                                        href={`/blogs/${blog.id}`}
                                    >
                                        Read Post...
                                    </Link>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Blogs to Show.</p>
            )}
            {/* Pagination Links */}
            <div className="mt-4">
                {blogs.links.map((link, index) =>
                    link.url === null ? (
                        <span
                            key={index}
                            className="px-2 py-1 mx-1 text-gray-500 cursor-default"
                        >
                            {link.label}
                        </span>
                    ) : (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-2 py-1 mx-1 ${
                                link.active
                                    ? "bg-blue-500 text-white"
                                    : "text-blue-500"
                            }`}
                        >
                            {link.label}
                        </Link>
                    )
                )}
            </div>
        </>
    );
};

export default Blogs;
