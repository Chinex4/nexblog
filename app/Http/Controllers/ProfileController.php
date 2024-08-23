<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function index(Request $request, User $user)
    {
        $blogs = Blog::with('user')->where('user_id', $user->id)->latest()->paginate(10);
        return Inertia::render('Profile/Index', [
            'user' => $user->load('followers', 'following'),
            'blogs' => $blogs,
            'isOwnProfile' => $request->user()->id === $user->id,
            'isFollowing' => $request->user()->following()->where('user_id', $user->id)->exists(),
        ]);
    }

    public function toggleFollow(Request $request, User $user)
    {
        $follower = $request->user();

        if ($follower->following()->where('user_id', $user->id)->exists()) {
            $follower->following()->detach($user->id);
        } else {
            $follower->following()->attach($user->id);
        }

        return redirect()->back();
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }


        // dd($request);


        $request->user()->save();

        return Redirect::route('profile.show', $request->user());
    }

    public function followers(Request $request, User $user)
    {
        return Inertia::render('Profile/FollowersFollowing', [
            'users' => $user->followers()->get(),
            'type' => 'followers',
            'isFollowing' => $request->user()->following()->where('user_id', $user->id)->exists()
        ]);
    }

    public function following(User $user)
    {
        return Inertia::render('Profile/FollowersFollowing', [
            'users' => $user->following()->get(),
            'type' => 'following',
        ]);
    }



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
