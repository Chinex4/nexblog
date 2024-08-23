<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function store(Blog $blog, Request $request)
    {
        $validated = $request->validate([
            'body' => 'required|max:255',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $request->user()->comments()->create([
            'body' => $validated['body'],
            'blog_id' => $blog->id,
            'parent_id' => $validated['parent_id'] ?? null,
        ]);


        return back();
    }
}
