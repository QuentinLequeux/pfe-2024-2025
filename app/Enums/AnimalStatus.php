<?php

namespace App\Enums;

enum AnimalStatus: string
{
    case Available = 'available';
    case Pending = 'pending';
    case Adopted = 'adopted';
}
