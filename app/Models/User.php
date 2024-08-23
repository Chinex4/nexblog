<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'bio'
    ];

    public function getProfilePictureUrlAttribute()
    {
        return $this->profile_picture ? asset('storage/' . $this->image) : asset('images/default-profile.jpg');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follower_user', 'user_id');
    }
    public function following()
    {
        return $this->belongsToMany(User::class, 'follower_user', 'follower_id', 'user_id');
    }

    public function bookmarks()
    {
        return $this->belongsToMany(Blog::class, 'bookmarks', 'user_id', 'blog_id');
    }
    public function likedBlogs()
    {
        return $this->belongsToMany(Blog::class, 'likes', 'user_id', 'blog_id');
    }
    public function likedComments()
    {
        return $this->belongsToMany(Comment::class, 'likes', 'user_id', 'comment_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Check if the user has liked a specific blog.
     *
     * @param Blog $blog
     * @return bool
     */
    public function hasLikedBlog(Blog $blog)
    {
        return $this->likedBlogs()->where('blog_id', $blog->id)->exists();
    }

    /**
     * Relationship to bookmarked blogs.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function bookmarkedBlogs()
    {
        return $this->belongsToMany(Blog::class, 'blog_user_bookmarks', 'user_id', 'blog_id');
    }

    /**
     * Check if the user has bookmarked a specific blog.
     *
     * @param Blog $blog
     * @return bool
     */
    public function hasBookmarkedBlog(Blog $blog)
    {
        return $this->bookmarkedBlogs()->where('blog_id', $blog->id)->exists();
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }
}
