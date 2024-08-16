import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Edit = ({ auth, blog }) => {
    const { data, setData, put, errors } = useForm({
        title: blog.title,
        body: blog.body,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/blogs/${blog.id}`);
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Blog
                </h2>
            }
        >
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 w-full lg:w-[35rem] mx-auto"
                >
                    <div>
                        <label className="text-white text-xl">Title</label>{" "}
                        <br />
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full uppercase"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-white text-xl">Body</label>{" "}
                        <br />
                        <textarea
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            className="w-full"
                            rows="14"
                        ></textarea>
                        {errors.title && (
                            <p className="text-red-500 text-xs">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <button
                        className="bg-green-700 text-white px-7 py-2 rounded-md hover:bg-green-700/50 transition-all duration-300"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </Authenticated>
    );
};

export default Edit;
