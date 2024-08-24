import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Blogs from "@/Components/Blogs";

export default function Index({
    auth,
    user,
    blogs,
    isFollowing,
}) {
    const { post, processing } = useForm();

    const handleFollowToggle = () => {
        post(route("profile.toggleFollow", user.id));
    };

    // console.log(user)
    console.log(blogs)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="max-w-4xl p-4 mx-auto text-white">
                {/* Header Section */}
                <div className="relative h-48 bg-gray-800 rounded-lg">
                    <img
                        src={
                            user.image
                                ? `../storage/${user.image}`
                                : "../images/default-profile.jpg"
                        }
                        alt={`${user.name}'s profile`}
                        className="absolute bottom-0 border-4 border-white rounded-full lg:left-4 size-32 lg:size-40"
                    />
                </div>

                {/* User Info Section */}
                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-gray-600">Email: {user.email}</p>
                        </div>
                        {user.id === auth.user.id && (
                            <div>
                                <Link
                                    href={route("profile.edit")}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-md"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-gray-100">{user.bio ? user.bio : 'Update your profile.'}</p>

                    <div className="flex mt-4 space-x-4">
                        <Link href={route("profile.followers", user.id)} className="text-gray-600">
                            <span className="font-bold">
                                {user.followers.length
                                    ? user.followers.length
                                    : 0}
                            </span>{" "}
                            Followers
                        </Link>
                        <Link href={route("profile.following", user.id)} className="text-gray-600">
                            <span className="font-bold">
                                {user.following.length
                                    ? user.following.length
                                    : 0}
                            </span>{" "}
                            Following
                        </Link>
                    </div>
                </div>

                {/* Follow/Unfollow Button */}

                {user.id !== auth.user.id && (
                    <form method="" onSubmit={handleFollowToggle}>
                        <div className="mt-4">
                            <button
                                className={`${
                                    isFollowing ? "bg-red-500" : "bg-blue-500"
                                } text-white px-4 py-2 rounded-md`}
                                disabled={processing}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        </div>
                    </form>
                )}

                {/* users posts */}
                <div className="my-8">
                    {/* Display followers and following lists conditionally based on user actions */}
                    <h1 className="text-2xl font-bold">My Posts</h1>
                    <Blogs auth={auth} blogs={blogs}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
