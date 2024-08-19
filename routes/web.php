<?php

use App\Models\Blog;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/explore-blogs', function () {
    $blogs = Blog::with('user')->latest()->paginate();

    // Return the Welcome page with blogs as a prop
    return Inertia::render('ExploreBlogs', [
        'blogs' => $blogs,
    ]);
});

Route::get('/dashboard', function () {
    $blogs = Blog::with('user')->latest()->paginate();

    return Inertia::render('Dashboard', [
        'blogs' => $blogs,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/blogs', function () {
//     return Inertia::render('Blogs/Index');
// })->middleware(['auth', 'verified'])->name('blogs');

Route::middleware(["auth", "verified"])->group(function () {
    Route::resource('blogs', BlogController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile/{user}', [ProfileController::class, 'index'])->name('profile.show');
    Route::post('/profile/{user}/follow', [ProfileController::class, 'toggleFollow'])->name('profile.toggleFollow');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile/{user}/followers', [ProfileController::class, 'followers'])->name('profile.followers');
    Route::get('/profile/{user}/following', [ProfileController::class, 'following'])->name('profile.following');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth')->group(function () {
    Route::post('/profile-picture-update', [PictureController::class, 'store'])->name('p_picture.store');
});

require __DIR__ . '/auth.php';
