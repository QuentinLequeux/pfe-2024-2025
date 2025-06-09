<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'iban',
        'website',
    ];

    public function animals()
    {
        return $this->hasMany(Animal::class, 'organization_id');
    }
}
