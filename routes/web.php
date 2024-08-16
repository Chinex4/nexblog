<?php

use App\Models\Blog;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\BlogController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/blogs', function () {
//     return Inertia::render('Blogs/Index');
// })->middleware(['auth', 'verified'])->name('blogs');

Route::middleware(["auth", "verified"])->group(function () {
    Route::resource('blogs', BlogController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
