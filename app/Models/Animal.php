<?php

namespace App\Models;

use Str;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property string|null $photo
 */

class Animal extends Model
{
    use HasFactory;
    use Searchable;

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */

    protected $fillable = [
        'organization_id',
        'name',
        'age',
        'weight',
        'arrival_date',
        'breed_id',
        'gender',
        'adoption_status',
        'photo',
        'description'
    ];

    public function toSearchableArray(): array

    {

        return array_merge($this->toArray(), [

            'id' => (string)$this->id,

            'name' => (string)$this->name,

            'breed' => (string)$this->breed->breed,

            'created_at' => $this->created_at->timestamp,

        ]);

    }

    public function breed()
    {
        return $this->belongsTo(Breeds::class); // Un animal a une race.
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class); // Un animal a une organisation.
    }

    public function sponsors()
    {
        return $this->hasMany(Sponsorship::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($animal) {
           $animal->slug = Str::slug($animal->name . '-' . Str::random(5));
        });
    }
}

// TODO : Changer le slug ?
