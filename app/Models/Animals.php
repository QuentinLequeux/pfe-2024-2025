<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Animals extends Model
{
    use HasFactory;
    use Searchable;

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */

    public function toSearchableArray(): array

    {

        return array_merge($this->toArray(), [

            'id' => (string)$this->id,

            'name' => (string)$this->name,

            'created_at' => $this->created_at->timestamp,

        ]);

    }

    public function breed()
    {
        return $this->belongsTo(Breeds::class, 'breed_id'); // Un animal a une race.
    }
}
