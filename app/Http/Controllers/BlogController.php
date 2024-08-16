<?php

namespace App\Http\Controllers;

use App\Models\Blog;
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
        //
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $blog = $request->user()->blogs()->create($request->only('title', 'body'));

        return redirect()->route('blogs.index')->with('message', 'Blog created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
        return Inertia::render('Blogs/Show', ['blog' => $blog->load('user')]);
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
        // Ensure the authenticated user is the owner of the blog
        $this->authorize('update', $blog);

        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $blog->update($request->only('title', 'body'));

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully');
    }

    public function destroy(Blog $blog)
    {
        // Ensure the authenticated user is the owner of the blog
        $this->authorize('delete', $blog);

        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully');
    }
}
