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
            $animals = QueryBuilder::for(Animal::with('breed')->withCount('sponsors')->whereIn('id', $id))
                ->allowedFilters([
                    AllowedFilter::exact('gender')
                ])
                ->allowedSorts(['name'])
                ->orderByRaw("
        CASE adoption_status
            WHEN 'Disponible' THEN 1
            WHEN 'En attente' THEN 2
            WHEN 'Adopté' THEN 3
            ELSE 99
        END
    ")
                ->orderBy('sponsors_count', 'asc')
                ->orderByRaw('RAND()')
                ->paginate(10);
        } else {
            $animals = QueryBuilder::for(Animal::with('breed'))->withCount('sponsors')
                ->allowedFilters([
                    AllowedFilter::exact('gender'),
                    AllowedFilter::exact('adoption_status'),
                    AllowedFilter::exact('breed_id'),
                    AllowedFilter::exact('organization_id'),
                    AllowedFilter::exact('breed.specie_id'),
                ])
                ->allowedSorts(['name'])
                ->orderByRaw("
        CASE adoption_status
            WHEN 'Disponible' THEN 1
            WHEN 'En attente' THEN 2
            WHEN 'Adopté' THEN 3
            ELSE 99
        END
    ")
                ->orderBy('sponsors_count', 'asc')
                ->orderByRaw('RAND()')
                ->paginate(10);
        }

        foreach ($animals as $animal) {
            if ($animal->photo) {
                $animal->photo_url = [
                    'large' => Storage::disk('s3')->url($animal->photo['large']),
                    'medium' => Storage::disk('s3')->url($animal->photo['medium']),
                    'small' => Storage::disk('s3')->url($animal->photo['small']),
                ];
            } else {
             $animal->photo_url = null;
            }
        }

        return response()->json($animals);
    }
}
