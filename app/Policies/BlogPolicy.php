<?php

namespace App\Policies;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Auth\Access\Response;

use Illuminate\Auth\Access\HandlesAuthorization;

class BlogPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the blog.
     */
    public function update(User $user, Blog $blog)
    {
        return $user->id === $blog->user_id;
    }

    /**
     * Determine whether the user can delete the blog.
     */
    public function delete(User $user, Blog $blog)
    {
        return $user->id === $blog->user_id;
    }
}
