<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Support\Facades\Storage;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');
        $limit = $request->get('limit');

        if ($query) {
            $id = Animal::search($query)->get()->pluck('id');
            $animals = QueryBuilder::for(Animal::with('breed')->whereIn('id', $id))
                ->allowedFilters([
                    AllowedFilter::exact('gender')
                ])
                ->allowedSorts(['name'])
                ->when($limit, fn ($q) => $q->limit($limit))
                ->get();
        } else {
            $animals = QueryBuilder::for(Animal::with('breed'))
                ->allowedFilters([
                    AllowedFilter::exact('gender'),
                    AllowedFilter::exact('adoption_status'),
                    AllowedFilter::exact('breed_id'),
                    AllowedFilter::exact('organization_id'),
                    AllowedFilter::exact('breed.specie_id'),
                ])
                ->allowedSorts(['name'])
                ->when($limit, fn($q) => $q->limit((int) $limit))->get();
        }

        $animals->each(function ($animal) {
            $animal->photo_url = $animal->photo ? Storage::disk('s3')->url($animal->photo) : null;
        });

        return response()->json($animals);
    }
}
