<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        //
        // dd($user);
        $request->validate([
            'image' => 'nullable|image|max:2048|mimes:png,jpg',
        ]);

        if ($request->hasFile('image')) {
            // Store the image in the 'public/images' directory
            $user->image = $request->file('image')->store('images', 'public');
        } else {
            $user->image = 'images/default-blog.jpg';
        }

        $user->save();

        return to_route('profile.edit')->with('message', 'Profile updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
