<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Support\Facades\Validator;

class FormSubmissionController extends Controller
{
    public function submit(Request $request, $formId)
    {
        $form = Form::with('fields')->findOrFail($formId);

        $rules = [];

        foreach ($form->fields as $field) {
            $fieldRules = [];

            if ($field->required) {
                $fieldRules[] = 'required';
            } else {
                $fieldRules[] = 'nullable';
            }

            switch ($field->type) {
                case 'text':
                    $fieldRules[] = 'string';
                    if ($field->name === 'name') {
                        $fieldRules[] = 'min:3';
                        $fieldRules[] = 'max:50';
                    }
                    break;

                case 'email':
                    $fieldRules[] = 'email';
                    break;

                case 'textarea':
                    $fieldRules[] = 'string';
                    $fieldRules[] = 'max:500';
                    break;
            }

            $rules[$field->name] = $fieldRules;
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        FormSubmission::create([
            'form_id' => $form->id,
            'data' => $request->only(array_keys($rules)),
        ]);

        return redirect()->back()->with('success', 'Formularz został wysłany.');
    }
}
