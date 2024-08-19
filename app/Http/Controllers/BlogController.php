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
        // $request->validate([
        //     'title' => 'required|string|min:10|max:100',
        //     'body' => 'required|string|min:10|max:2500',
        //     'image' => 'nullable|image|max:2048|mimes:png,jpg',
        // ]);

        // if ($request->hasFile('image')) {
        //     $request->user()->image = $request->file('image')->store('images', 'public');
        // }

        // $blog = $request->user()->blogs()->create($request->only('title', 'body', 'image'));

        // return redirect()->route('blogs.index')->with('message', 'Blog created successfully');

        // $request->validate([
        //     'title' => 'required|string|min:10|max:100',
        //     'body' => 'required|string|min:10|max:2500',
        //     'image' => 'nullable|image|max:2048|mimes:png,jpg',
        // ]);

        // $data = $request->only('title', 'body');

        // // Handle the image upload
        // if ($request->hasFile('image')) {
        //     // Store the image in the 'public/images' directory
        //     $data['image'] = $request->file('image')->store('images', 'public');
        // }

        // // Create the blog with the validated data and the image path
        // $blog = $request->user()->blogs()->create($data);

        // return redirect()->route('blogs.index')->with('message', 'Blog created successfully');

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
        // $this->authorize('update', $blog);

        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'body' => 'required|string',
        //     // 'image' => 'nullable|image|max:2048|mimes:png,jpg'
        // ]);

        // $blog->update($request->only('title', 'body'));

        // return redirect()->route('blogs.index')->with('success', 'Post updated successfully');

        $inputData = $request->validate([
            'title' => 'required|string|min:10|max:100',
            'body' => 'required|string|min:10|max:2500',
            // 'image' => 'nullable|image|max:2048|mimes:png,jpg',
        ]);

        // if ($request->hasFile('image')) {
        //     # code...
        //     $inputData['image'] = $request->file('image')->store('images', 'public');
        // } else {
        //     $inputData['image'] = 'images/default-blog.jpg';
        // }

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
}
