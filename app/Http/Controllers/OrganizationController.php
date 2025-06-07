<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Organizations;

class OrganizationController extends Controller
{
    public function show()
    {
        return Inertia::render('organization/admin', [
            'users' => User::select('id','email')->orderBy('email')->get(),
            'organizations' => Organizations::select('id','name')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('organization/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:organizations,name',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:30|unique:organizations,phone',
            'email' => 'required|string|email|max:255|unique:organizations,email',
            'iban' => 'required|string|max:255|unique:organizations,iban|regex:/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/',
            'website' => 'required|string|max:255|unique:organizations,website|url',
        ]);

        Organizations::create($validated);

        return redirect()->route('organization.show')->with('success', 'Organisation ajoutée avec succès !');
    }

    public function updateUserOrganization(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'organization_id' => 'nullable|exists:organizations,id',
        ]);

        $user = User::findOrFail($data['user_id']);
        $user->organization_id = $data['organization_id'];
        $user->save();

        return redirect()->route('organization.show')->with('success', 'Utilisateur associé à l\'organisation avec succès');
    }
}
