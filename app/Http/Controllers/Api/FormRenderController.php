<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Services\FormRenderer;
use Illuminate\Http\Response;

class FormRenderController extends Controller
{
    public function __construct(protected FormRenderer $renderService) {}
    public function render(Form $form): Response
    {
        $html = $this->renderService->render($form);

        return response($html, 200)
            ->header('Content-Type', 'text/html');
    }
}
