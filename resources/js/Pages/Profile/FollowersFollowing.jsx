import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function FollowersFollowing({ auth, users, type, isFollowing }) {
    const { post, processing } = useForm();

    const handleFollowToggle = () => {
        post(route("profile.toggleFollow", auth.user.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 capitalize dark:text-gray-200">
                    {`${type}`}
                </h2>
            }
        >
            <Head title={`${auth.user.name}'s ${type}`} />

            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {type === "followers" ? "Followers" : "Following"}
                </h1>
                {users.length > 0 ? (
                    <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center space-x-4"
                        >
                            <Link
                                href={route("profile.show", user.id)}
                                className="flex items-center"
                            >
                                <img
                                    src={
                                        user.image
                                            ? `/storage/${user.image}`
                                            : "/images/default-profile.jpg"
                                    }
                                    alt="Profile Picture"
                                    className="w-12 h-12 border border-gray-300 rounded-full dark:border-gray-700"
                                />
                                <span className="ml-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {user.name}
                                </span>
                            </Link>
                            
                        </li>
                    ))}
                </ul>
                ) : (
                    <p className="text-white">You do not have any followers</p>
                )}
                
            </div>
        </AuthenticatedLayout>
    );
}
