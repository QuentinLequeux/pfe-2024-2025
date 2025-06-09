<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Species extends Model
{
    use HasFactory;

    public function animals()
    {
        return $this->hasMany(Animal::class, 'breed_id'); // Une espèce peut avoir plusieurs animaux.
    }
}
