<?php

namespace App\Http\Controllers;

use Auth;
use Stripe\Stripe;
use Inertia\Inertia;
use App\Models\Animal;
use App\Models\Sponsorship;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;

class DonationController extends Controller
{
    public function show()
    {
        $animal = Animal::findOrFail(request('animal'));

        if ($animal->adoption_status === 'Adopté') {
            abort(403, 'Cet animal a déjà été adopté.');
        }

        return Inertia::render('donation/checkout', ['stripeKey'=> config('services.stripe.key')]);
    }

    /**
     * @throws ApiErrorException
     */
    public function process(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1|decimal:0,2',
            'animal_id' => 'required|numeric|exists:animals,id',
        ]);

        $animal = Animal::findOrFail($request->animal_id);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Don pour ' . $animal->name,
                        ],
                        'unit_amount' => $request->amount * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'metadata' => [
                'user_id' => Auth::id(),
                'animal_id' => $request->animal_id,
                'amount' => $request->amount,
            ],
            'success_url' => route('donation.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('animals'),
        ]);

        return Inertia::location($session->url);
    }

    /**
     * @throws ApiErrorException
     */
    public function success(Request $request)
    {
        $sessionId = $request->get('session_id');

        if (!$sessionId) {
            abort(400, 'No session ID provided');
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::retrieve($sessionId);

        $metadata = $session->metadata;

        if ($session->payment_status == 'paid') {
            if (!Sponsorship::where('stripe_session_id', $session->id)->exists()) {
                Sponsorship::create([
                    'stripe_session_id' => $session->id,
                    'user_id' => $metadata->user_id,
                    'animal_id' => $metadata->animal_id,
                    'amount' => $metadata->amount,
                    'sponsored_at' => now()
                ]);
            }
            return Inertia::render('donation/success');
        }
        return redirect()->route('animals');
    }
}

// TODO : Page d'erreur 400 ?
