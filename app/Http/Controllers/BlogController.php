<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BlogController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $blogs = Blog::with('user')->latest()->paginate(10);
        return Inertia::render('Blogs/Index', ['blogs' => $blogs]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Blogs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $inputData = $request->validate([
            'title' => 'required|string|min:10|max:100',
            'body' => 'required|string|min:10|max:2500',
            'image' => 'nullable|image|max:2048|mimes:png,jpg',
        ]);

        if ($request->hasFile('image')) {
            // Store the image in the 'public/images' directory
            $inputData['image'] = $request->file('image')->store('images', 'public');
        } else {
            $inputData['image'] = 'images/default-blog.jpg';
        }
        $inputData['user_id'] = $request->user()->id;

        $blog = Blog::create($inputData);

        return to_route('blogs.show', $blog)->with('message', 'Post was created successfully.');
    }

    public function show(Request $request, Blog $blog)
    {
        $blog->load(['comments.user', 'comments.likes', 'comments.replies.user']);

        return Inertia::render('Blogs/Show', [
            'blog' => $blog->load('user', 'comments', 'likes'),
            'likeCount' => $blog->likes->count(),
            'isLiked' => $blog->likes()->where('user_id', $request->user()->id)->exists(),
            'isBookMarked' => $blog->bookmarks()->where('user_id', $request->user()->id)->exists(),
            'comments' => $blog->comments()->with('user')->latest()->get()->map(function ($comment) use ($request) {
                return [
                    'id' => $comment->id,
                    'body' => $comment->body,
                    'user' => $comment->user,
                    'created_at' => $comment->created_at,
                    'likeCount' => $comment->likes->count(),
                    'isCommentLiked' => $comment->likes()->where('user_id', $request->user()->id)->exists(),
                    'replies' => $comment->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'bodyy' => $reply->bodyy,
                            'user' => $reply->user,  // Including user information for each reply
                            'created_at' => $reply->created_at,
                        ];
                    }),
                    'replyCount' => $comment->replies->count()
                ];
            }),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        // Ensure the authenticated user is the owner of the blog
        $this->authorize('update', $blog);

        return Inertia::render('Blogs/Edit', ['blog' => $blog]);
    }

    public function update(Request $request, Blog $blog)
    {
        
        $inputData = $request->validate([
            'title' => 'required|string|min:10|max:100',
            'body' => 'required|string|min:10|max:2500',
        ]);

        $blog->update($inputData);

        return to_route('blogs.show', $blog)->with('message', 'Post was updated successfully');
    }
    public function destroy(Blog $blog)
    {
        // Ensure the authenticated user is the owner of the blog
        $this->authorize('delete', $blog);

        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully');
    }

    public function toggleLike(Request $request, Blog $blog)
    {
        $like = $blog->likes()->where('user_id', $request->user()->id);

        if ($like) {
            $like->delete();
        } else {
            $blog->likes()->create(['user_id' => $request->user()->id]);
        }

        return redirect()->back();
    }
}
