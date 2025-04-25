<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Breeds extends Model
{
    use HasFactory;

    public function animals()
    {
        return $this->hasMany(Animals::class); // Une race peut avoir plusieurs animaux.
    }

    public function specie() {
        return $this->belongsTo(Species::class, 'specie_id'); // Une race appartient à une espèce.
    }
}
