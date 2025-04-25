<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('forms');
})->name('forms-list');

Route::get('/add', function () {
    return Inertia::render('addForm');
})->name('add');

Route::get('/example/{id}', function ($id) {
    return Inertia::render('example', [
        'formId' => $id
    ]);
})->name('example');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
