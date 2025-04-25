<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\FormController;
use App\Http\Controllers\Api\FormFieldController;
use App\Http\Controllers\Api\FormRenderController;

Route::prefix('forms')->group(function () {
    Route::get('/', [FormController::class, 'index']);
    Route::post('/', [FormController::class, 'store']);
    Route::get('/{form}', [FormController::class, 'show']);
    Route::delete('/{form}', [FormController::class, 'destroy']);

    Route::post('/{form}/fields', [FormFieldController::class, 'store']);
    Route::get('/{form}/rendered', [FormRenderController::class, 'render']);

    Route::post('/submit-form', [FormController::class, 'submit']);
});
