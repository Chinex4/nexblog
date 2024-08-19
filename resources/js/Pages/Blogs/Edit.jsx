import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

const Edit = ({ auth, blog }) => {
    const { data, setData, put, errors, progress } = useForm({
        title: blog.title,
        body: blog.body,
        image: blog.image,
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
            <Head title="Edit Post" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 w-full lg:w-[35rem] mx-auto"
                >
                    <div className="px-4">
                        <InputLabel
                            className="md:text-lg"
                            htmlFor="title"
                            value="Title"
                        />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full uppercase"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            autoComplete="title"
                        />
                        {errors.title && (
                            <InputError
                                className="mt-2"
                                message={errors.title}
                            />
                        )}
                    </div>
                    <div className="px-4">
                        <InputLabel
                            className="md:text-lg"
                            htmlFor="body"
                            value="Body"
                        />

                        <TextareaInput
                            id="body"
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            className="w-full"
                            rows="14"
                        ></TextareaInput>
                        {errors.body && (
                            <InputError
                                className="mt-2"
                                message={errors.body}
                            />
                        )}
                    </div>
                    {/* <div className="px-4">
                        <InputLabel
                            htmlFor="image"
                            value="Attach a new image (optional)"
                        />

                        <TextInput
                            id="image"
                            type="file"
                            name="image"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                        />

                        {progress && (
                            <progress value={progress.percentage} max={"max"}>
                                {progress.percentage}%
                            </progress>
                        )}

                        <InputError className="mt-2" message={errors.image} />
                    </div> */}
                    <div className="px-4">
                        <button
                            className="bg-green-700 text-white px-7 py-2 rounded-md hover:bg-green-700/50 transition-all duration-300"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Edit;
