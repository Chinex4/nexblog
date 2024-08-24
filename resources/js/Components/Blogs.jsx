import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import React from "react";

const Blogs = ({ blogs, auth }) => {
    // console.log(blogs.image);
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    }
    return (
        <>
            {blogs ? (
                <ul className="grid grid-cols-1 gap-5 mt-10 text-white md:grid-cols-2 lg:grid-cols-3">
                    {blogs.data.map((blog) => (
                        <li
                            className="px-4 py-6 space-y-4 border rounded-lg"
                            key={blog.id}
                        >
                            <div className="overflow-hidden h-44">
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
                            <h1 className="text-xl font-bold capitalize">
                                {truncateText(blog.title, 55)}
                            </h1>
                            <p className="text-sm">
                                {truncateText(blog.body, 100)}
                            </p>
                            <Link
                                href={route("profile.show", blog.user)}
                                className="flex items-center space-x-2 text-sm text-white transition-all duration-300 hover:underline"
                            >
                                <span
                                    className="grid overflow-hidden border border-gray-300 rounded-full size-6 place-items-center"
                                    style={{
                                        backgroundImage: `url(${
                                            blog.user.image
                                                ? `/storage/${blog.user.image}`
                                                : "/images/default-profile.jpg"
                                        })`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                ></span>

                                <span>{blog.user.name}</span>
                            </Link>
                            <p className={`text-white/50 text-xs`}>
                                Posted{" "}
                                {format(
                                    new Date(blog.created_at),
                                    "MMMM dd, yyyy"
                                )}
                            </p>
                            {auth.user && (
                                <>
                                    <Link
                                        className="inline-block px-4 py-2 mt-8 bg-blue-500 rounded-lg"
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
