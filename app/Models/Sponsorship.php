<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsorship extends Model
{
    protected $fillable = [
        'stripe_session_id',
        'user_id',
        'animal_id',
        'amount',
        'sponsored_at'
    ];
}
