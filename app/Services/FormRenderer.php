<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Form;

class FormRenderer
{
    public static function render(Form $form): string
    {
        $form->load('fields');

        $title = e($form->name);
        $description = e($form->description);

        $html = <<<HTML
            <div class="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md space-y-4">
                <h2 class="text-2xl font-bold text-gray-800">{$title}</h2>
                <p class="text-gray-600">{$description}</p>

                <form action="{$form->action_url}" method="POST" class="space-y-4">
        HTML;

        foreach ($form->fields as $field) {
            $required = $field->required ? 'required' : '';
            $class = e($field->class ?? 'form-input');
            $name = e($field->name);
            $label = ucfirst($name);
            $type = $field->type;

            $html .= "<div class=\"flex flex-col gap-1\">";

            if ($type !== 'button') {
                $html .= "<label for=\"{$name}\" class=\"text-sm font-medium text-gray-700\">{$label}</label>\n";
            }

            if ($type === 'textarea') {
                $html .= "<textarea name=\"{$name}\" id=\"{$name}\" class=\"text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 {$class}\" {$required}></textarea>\n";
            } elseif ($type === 'button') {
                $html .= "<input type=\"submit\" value=\"{$name}\" class=\"bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition {$class}\" />\n";
            } else {
                $html .= "<input type=\"{$type}\" name=\"{$name}\" id=\"{$name}\" class=\"text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 {$class}\" {$required} />\n";
            }

            $html .= "</div>";
        }

        $html .= "</form>";

        return $html;
    }
}

