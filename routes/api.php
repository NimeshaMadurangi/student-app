<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/students', [StudentController::class, 'display']);

Route::delete('/students/{id}', [StudentController::class, 'destroy']);

Route::put('/students/{id}', [StudentController::class, 'update'])->name('student.update');

//Route::put('/students/{id}', [StudentController::class, 'update']);

//Route::put('/api/students/{id}', [StudentController::class, 'update']);

Route::get('/student-list', [StudentController::class, 'index'])->name('student-list');

Route::put('/students/{id}', [StudentController::class, 'updateStatus']);

