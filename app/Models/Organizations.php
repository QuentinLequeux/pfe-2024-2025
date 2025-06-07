<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organizations extends Model
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
        return $this->hasMany(Animals::class, 'organization_id');
    }
}
