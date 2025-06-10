<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Breeds extends Model
{
    use HasFactory;
    use Searchable;

    public function toSearchableArray(): array

    {

        return array_merge($this->toArray(), [

            'id' => (string)$this->id,

            'breed' => (string)$this->breed,

            'created_at' => $this->created_at->timestamp,

        ]);

    }

    public function animals()
    {
        return $this->hasMany(Animal::class); // Une race peut avoir plusieurs animaux.
    }

    public function specie() {
        return $this->belongsTo(Species::class, 'specie_id'); // Une race appartient à une espèce.
    }
}
