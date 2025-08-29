<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
      'stripe_id', 'amount', 'currency', 'status', 'method', 'user_id', 'animal_id', 'organization_id'
    ];
}
