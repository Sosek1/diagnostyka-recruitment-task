<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;

class FormFieldController extends Controller
{
    public function store(Request $request, Form $form)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:text,email,textarea,button',
            'name' => 'required|string|max:255',
            'class' => 'nullable|string|max:255',
            'required' => 'required|boolean',
            'order' => 'required|integer',
        ]);

        $field = $form->fields()->create($validated);

        return response()->json($field, 201);
    }
}
