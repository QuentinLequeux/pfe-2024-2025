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
        $limit = $request->get('limit');

        if ($query) {
            $animalsQuery = Animal::search($query);
            $animals = $limit ? $animalsQuery->take((int) $limit)->get() : $animalsQuery->get();
            $animals->load('breed');
        } else {
            $animals = Animal::with('breed')->inRandomOrder();
            $animals = $limit ? $animals->limit((int) $limit)->get() : $animals->get();
        }

        $animals->each(function ($animal) {
            $animal->photo_url = $animal->photo ? Storage::disk('s3')->url($animal->photo) : null;
        });

        return response()->json($animals);
    }
}
