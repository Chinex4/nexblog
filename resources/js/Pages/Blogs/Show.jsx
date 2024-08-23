import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import DeleteBlogPost from "./Partials/DeleteBlogPost";
import { format } from "date-fns";
import { FaThumbsUp, FaBookmark, FaRegComment, FaShare } from "react-icons/fa";

const Show = ({ blog, auth, likeCount, isLiked, isBookMarked, comments }) => {
    const formattedDate = format(new Date(blog.created_at), "MMMM dd, yyyy");
    // Other states
    const [replyVisible, setReplyVisible] = useState({});


    // Handlers
    const handleReplyToggle = (commentId) => {
        setReplyVisible(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    const handleShare = (e) => {
        e.preventDefault();
        const shareUrl = `${window.location.origin}/blogs/${blog.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Blog link copied to clipboard!");
        });
    };

    const { data, setData, post, reset } = useForm({
        body: '',
        bodyy: '',
    });

    const handleLike = (e) => {
        e.preventDefault();
        post(route('blogs.like', blog.id));
    };

    const handleBookmark = (e) => {
        e.preventDefault();
        post(route('blogs.bookmark', blog.id));
    };

    const submitComment = (e) => {
        e.preventDefault();
        post(route('comments.store', blog.id), {
            onSuccess: () => reset(),
        });
    };

    const submitReply = (e, commentId) => {
        e.preventDefault();
        post(route('replies.store', commentId), {
            onSuccess: () => {
                // setReplyData(prev => ({ ...prev, [commentId]: '' }));
                setReplyVisible(prev => ({ ...prev, [commentId]: false }));
            },
        });
    };

    // console.log(comments)

    const handleCommentLike = (commentId) => {
        post(route('comments.like', commentId));
    };

    // console.log(comments)

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 uppercase truncate dark:text-gray-200">
                    Post {blog.title}
                </h2>
            }
        >
            <Head title={blog.title} />
            <div className="px-4 py-12 mx-auto space-y-6 text-white max-w-7xl sm:px-6 lg:px-8">
                <Link href={route('profile.show', blog.user)} className="flex items-center space-x-2 transition-all duration-500 text-white/50 hover:text-white">
                    <div className="grid overflow-hidden border rounded-full size-10 place-items-center">
                        <img
                            className=""
                            src={
                                blog.user.image
                                    ? `/storage/${blog.user.image}`
                                    : "/images/default-blog.jpg"
                            }
                            alt="blog-image"
                        />
                    </div>

                    <Link href={route('profile.show', blog.user)}>{blog.user.name}</Link>
                </Link>
                <h1 className="text-xl font-bold uppercase lg:text-3xl">
                    {blog.title}
                </h1>
                <p className="leading-[25px]">{blog.body}</p>
                <div className="overflow-hidden">
                    <img
                        className="rounded-md w-full lg:w-[20rem]"
                        src={
                            blog.image
                                ? `../../storage/${blog.image}`
                                : "../../images/default-blog.jpg"
                        }
                        alt="blog-image"
                    />
                </div>
                <small className="block mt-3 text-white/50">Posted at {formattedDate}</small>

                {/* Like and comment section */}
                {/* Like, comment, and bookmark section */}
                <div className="flex items-center mt-6 space-x-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold text-xs uppercase transition-all duration-300
                            ${isLiked ? 'text-green-500' : 'text-white/50 hover:text-white'}`}
                    >
                        <FaThumbsUp className="w-5 h-5" />
                        <span>{likeCount ? likeCount : '0'}</span>
                    </button>
                    <button
                        onClick={handleBookmark}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold text-xs uppercase transition-all duration-300
                        ${isBookMarked ? 'text-blue-500' : 'text-white/50 hover:text-white'}`}
                    >
                        <FaBookmark className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center px-4 py-2 space-x-2 text-xs font-semibold uppercase transition-all duration-300 rounded-md text-white/50 hover:text-white"
                    >
                        <FaShare className="w-5 h-5" />
                    </button>
                </div>

                {/* Comment section */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-300">Comments</h3>
                    <form onSubmit={submitComment} className="mt-4">
                        <textarea
                            value={data.body}
                            onChange={e => setData('body', e.target.value)}
                            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
                            rows="4"
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 mt-2 tracking-widest text-white uppercase transition duration-300 bg-blue-600 rounded-md hover:bg-blue-500"
                        >
                            Comment
                        </button>
                    </form>

                    <div className="mt-6 space-y-4">
                        {comments ? (
                            comments.map((comment) => (
                            <div key={comment.id} className="p-4 bg-gray-800 rounded-md">
                                <div className="flex items-center justify-between mb-2 space-x-3">
                                    <Link href={route('profile.show', comment.user)} className="flex items-center space-x-2 text-sm font-bold text-white hover:underline">
                                        <div className="grid overflow-hidden border rounded-full size-10 place-items-center">
                                            <img
                                                className=""
                                                src={
                                                    comment.user.image
                                                        ? `/storage/${comment.user.image}`
                                                        : "/images/default-blog.jpg"
                                                }
                                                alt="blog-image"
                                            />
                                        </div>
                                        <span>{comment.user.name}</span>
                                    </Link>
                                    <span className="text-sm text-gray-500">{format(new Date(comment.created_at), "MMMM dd, yyyy")}</span>
                                </div>
                                <p className="my-4 text-white">{comment.body}</p>
                                <div className="flex items-center mt-2 space-x-4">
                                    <button
                                        onClick={() => handleCommentLike(comment.id)}
                                        className={`flex items-center space-x-2 rounded-md font-semibold text-xs uppercase transition-all duration-300
                                        ${comment.isCommentLiked ? 'text-green-500' : 'text-white/50 hover:text-white'}`}
                                    >
                                        <FaThumbsUp className="w-5 h-5" />
                                        <span>{comment.likeCount}</span>
                                    </button>
                                    <button onClick={() => handleReplyToggle(comment.id)} className="flex items-center space-x-2 transition-all duration-300 text-white/50 hover:text-white">
                                        <FaRegComment className="w-5 h-5" />
                                        <span>Reply</span>
                                        <span>{comment.replyCount ? comment.replyCount : '0'}</span>
                                    </button>
                                </div>
                                {/* Reply Input */}
                                {replyVisible[comment.id] && (
                                    <form onSubmit={(e) => submitReply(e, comment.id)} className="mt-4">
                                        <textarea
                                            value={data.bodyy}
                                            onChange={e => setData('bodyy', e.target.value)}
                                            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md"
                                            rows="3"
                                            placeholder="Write a reply..."
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 mt-2 tracking-widest text-white uppercase transition duration-300 bg-blue-600 rounded-md hover:bg-blue-500"
                                        >
                                            Reply
                                        </button>
                                    </form>
                                )}
                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="mt-4 space-y-4">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="p-4 bg-gray-700 rounded-md">
                                                <div className="flex items-center justify-between mb-2 space-x-2">
                                                    <Link href={route('profile.show', reply.user.id)} className="flex items-center space-x-2 text-sm font-bold text-white hover:underline">
                                                        <div className="grid overflow-hidden border rounded-full size-10 place-items-center">
                                                            <img
                                                                src={reply.user.image ? `/storage/${reply.user.image}` : "/images/default-profile.jpg"}
                                                                alt="profile"
                                                            />
                                                        </div>
                                                        <span>
                                                        {reply.user.name}</span>
                                                    </Link>

                                                    <span className="text-sm text-gray-500">replying {comment.user.name}</span>
                                                </div>
                                                <p className="my-2 text-white">{reply.bodyy}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            ))
                        ) : (
                            <p className="text-center text-white/50">No comments. Be the first to comment.</p>
                        )
                    }
                    </div>
                </div>

                <div className="space-x-3">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md bg-slate-600 hover:bg-slate-500/25 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Go Back
                    </Link>
                    <Link
                        href=""
                        onClick={handleShare}
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500/25 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Share
                    </Link>
                    {auth.user.id === blog.user_id && (
                        <>
                            <Link
                                href={`/blogs/${blog.id}/edit`}
                                className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500/25 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 duration-150ion-300"
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
