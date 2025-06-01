<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeSeance extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'date',
        'duree_minutes'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function seances()
    {
        return $this->hasMany(Seance::class, 'type_seance_id');
    }
}
