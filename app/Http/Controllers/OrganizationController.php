<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Animal;
use Illuminate\Http\Request;
use App\Models\Organization;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class OrganizationController extends Controller
{
    use AuthorizesRequests;

    public function show()
    {
        $this->authorize('viewAny', Organization::class);

        return Inertia::render('organization/admin', [
            'roles' => Role::all(['id', 'name']),
            'users' => User::select('id','email')->orderBy('email')->get(),
            'organizations' => Organization::select('id','name')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Organization::class);

        return Inertia::render('organization/create');
    }

    public function byOrganization(Organization $organization)
    {
        $animals = Animal::with('breed')
            ->withCount('sponsors')
            ->where('organization_id', $organization->id)
            ->orderByRaw("
            CASE adoption_status
                WHEN 'Disponible' THEN 1
                WHEN 'En attente' THEN 2
                WHEN 'Adopté' THEN 3
            END
            ")
            ->orderBy('sponsors_count', 'asc')
            ->orderByRaw('RAND()')
            ->paginate(10);

        foreach ($animals as $animal) {
            $animal->photo_url = $animal->photo
                ? Storage::disk('s3')->url($animal->photo)
                : null;
        }

        return Inertia::render('organization/animals', [
           'organization' => $organization,
           'animals' => $animals,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Organization::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:organizations,name',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:30|unique:organizations,phone',
            'email' => 'required|string|email|max:255|unique:organizations,email',
            'iban' => 'required|string|max:255|unique:organizations,iban|regex:/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/',
            'website' => 'required|string|max:255|unique:organizations,website|url',
        ]);

        Organization::create($validated);

        return redirect()->route('organization.show')->with('success', 'Organisation ajoutée avec succès !');
    }

    public function updateUserOrganization(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'organization_id' => 'nullable|exists:organizations,id',
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::findOrFail($data['user_id']);

        if ($user->hasRole('Administrateur') && $data['role'] === 'Utilisateur') {
            return redirect()->back()->with('access', 'Un administrateur ne peut pas être assigné au rôle "Utilisateur"')->withInput();
        }

        $user->organization_id = $data['organization_id'];
        $user->save();

        $user->syncRoles([$data['role']]);

        return redirect()->route('organization.show')->with('success', 'Utilisateur associé à l\'organisation avec succès');
    }
}
