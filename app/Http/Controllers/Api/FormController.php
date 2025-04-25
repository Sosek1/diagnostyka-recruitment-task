<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'action_url' => 'required|url',
        ]);

        $form = Form::create($validated);

        return response()->json($form, 201);
    }

    public function show(Form $form)
    {
        $form->load('fields'); // eager loading pól

        return response()->json($form);
    }
}
