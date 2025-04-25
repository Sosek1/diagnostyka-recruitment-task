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
            'fields' => 'required|array|min:1',
            'fields.*.type' => 'required|string|in:text,email,textarea,button',
            'fields.*.name' => 'required|string|max:255',
            'fields.*.class' => 'nullable|string|max:255',
            'fields.*.required' => 'required|boolean',
            'fields.*.order' => 'required|integer',
        ]);

        $createdFields = [];

        foreach ($validated['fields'] as $fieldData) {
            $createdFields[] = $form->fields()->create($fieldData);
        }

        return response()->json([
            'message' => 'Fields created successfully.',
            'fields' => $createdFields,
        ], 201);
    }
}
