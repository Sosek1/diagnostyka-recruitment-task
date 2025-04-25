<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'action_url'];

    public function fields()
    {
        return $this->hasMany(FormField::class)->orderBy('order');
    }
}
