<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');

        if ($query) {
            $animals = Animal::search($query)->take(3)->get(); // Récupère jusqu'à trois résultats de recherche.
            $animals->load('breed');
        } else {
            $animals = Animal::with('breed')->inRandomOrder()->limit(3)->get(); // Récupère trois animaux aléatoires à afficher par défaut.
        }

        $animals->each(function ($animal) {
            $animal->photo_url = $animal->photo ? Storage::disk('s3')->url($animal->photo) : null;
        });

        return response()->json($animals);
    }
}
