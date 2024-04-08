<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Models\Student;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
|
*/


Route::prefix('')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/StudentPage', [StudentController::class, 'index'])->name('student');

    Route::get('/StudentList', [StudentController::class, 'view'])->name('studentlist');

    Route::post('/upload', [StudentController::class, 'store']);

    Route::get('/students/{id}/edit', function ($id) {
        return Inertia::render('StudentEdit', [
            'student' => $id
        ]);
    })->name('student.edit');

    Route::put('/students/{id}', 'StudentController@update')->name('students.update');

    

    // Route::prefix('students')->group(function () {
    //     Route::put('/{id}', [StudentController::class, 'update'])->name('students.update');
    // });

});

Route::prefix('')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
