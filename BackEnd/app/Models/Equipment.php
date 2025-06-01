<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipments';

    protected $fillable = [
        'name',
        'icon',
        'total',
        'status',
        'damaged'
    ];

    protected $casts = [
        'total' => 'integer',
        'damaged' => 'integer'
    ];
} 