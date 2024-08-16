import { Link } from "@inertiajs/react";
import React from "react";

const Blogs = ({ blogs, auth }) => {
    return (
        <>
            {blogs ? (
                <ul className="mt-10 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {blogs.data.map((blog) => (
                        <li
                            className="border px-6 py-8 rounded-lg space-y-4"
                            key={blog.id}
                        >
                            <h1 className="text-xl font-bold truncate">{blog.title}</h1>
                            <p className="text-xs truncate">{blog.title}</p>
                            <p>
                                <span>By {blog.user.name}</span>
                            </p>
                            {auth.user && (
                                <>
                                    <Link
                                        className="inline-block rounded-lg mt-8 bg-blue-500 px-4 py-2"
                                        href={`/blogs/${blog.id}`}
                                    >
                                        View Blog
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
