<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    //
    public function toggleBlogLike(Blog $blog, Request $request)
    {
        $user = $request->user();

        if ($user->likedBlogs()->where('blog_id', $blog->id)->exists()) {
            // If the user already liked the blog, remove the like
            $user->likedBlogs()->detach($blog->id);
        } else {
            // If the user hasn't liked the blog, add the like
            $user->likedBlogs()->attach($blog->id);
        }

        // $user = $request->user();

        // if ($user->likedBlogs()->where('blog_id', $blog->id)->exists()) {
        //     // If the user already liked the blog, remove the like
        //     $user->likedBlogs()->detach($blog->id);
        // } else {
        //     // If the user hasn't liked the blog, add the like
        //     $user->likedBlogs()->attach($blog->id);
        // }

        return back();
    }

    public function toggleCommentLike(Comment $comment, Request $request)
    {
        $user = $request->user();

        if ($user->likedComments()->where('comment_id', $comment->id)->exists()) {
            // If the user already liked the comment, detach it
            $user->likedComments()->detach($comment->id);
        } else {
            // Otherwise, attach it
            $user->likedComments()->attach($comment->id);
        }

        return back();
    }
}
