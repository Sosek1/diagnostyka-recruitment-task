<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function index()
    {
        $forms = Form::with('fields')->get();

        return response()->json($forms);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'action_url' => 'required|url',
        ]);

        $form = Form::create($validated);

        return response()->json([
            'message' => 'Form created successfully.',
            'form_id' => $form->id,
        ], 201);
    }

    public function show(Form $form)
    {
        $form->load('fields');

        return response()->json($form);
    }
}
