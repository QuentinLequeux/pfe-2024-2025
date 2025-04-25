<?php

namespace App\Enums;

enum AnimalStatus: string
{
    case Available = 'Disponible';
    case Pending = 'En attente';
    case Adopted = 'Adopté';
}
