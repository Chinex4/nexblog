<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    //
    public function toggle(Blog $blog, Request $request)
    {
        $user = $request->user();

        if ($user->bookmarks()->where('blog_id', $blog->id)->exists()) {
            // If the user already bookmarked the blog, remove the bookmark
            $user->bookmarks()->detach($blog->id);
        } else {
            // If the user hasn't bookmarked the blog, add the bookmark
            $user->bookmarks()->attach($blog->id);
        }

        return back();
    }
}
