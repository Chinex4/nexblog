import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@headlessui/react";
import TextareaInput from "@/Components/TextareaInput";
import InputError from "@/Components/InputError";

const Create = ({ auth }) => {
    const { data, setData, post, errors, progress } = useForm({
        title: "",
        body: "",
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("blogs.store"));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Post
                </h2>
            }
        >
            <Head title="Create Post" />
            <div className="py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                            className="block w-full mt-1 uppercase"
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
                    {/* {data.image !== "" && (
                        <img src={data.image} alt="profile picture" />
                    )} */}
                    <div className="px-4">
                        <InputLabel htmlFor="image" value="Attach an Image (Optional)" />

                        <TextInput
                            id="image"
                            type="file"
                            name="image"
                            className="block w-full mt-1"
                            onChange={(e) => setData("image", e.target.files[0])}
                        />

                        {progress && (
                            <progress value={progress.percentage} max={"max"}>
                                {progress.percentage}%
                            </progress>
                        )}

                        <InputError className="mt-2" message={errors.image} />
                    </div>
                    <div className="px-4">
                        <button
                            className="py-2 text-white transition-all duration-300 bg-green-700 rounded-md px-7 hover:bg-green-700/50"
                            type="submit"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
