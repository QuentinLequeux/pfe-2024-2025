<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;

    public function animals()
    {
        return $this->hasMany(Animals::class, 'breed_id'); // Une espèce peut avoir plusieurs animaux.
    }
}
