<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;

class DonationController extends Controller
{
    /**
     * @throws ApiErrorException
     */
    public function process(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1|decimal:0,2',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Don',
                        ],
                        'unit_amount' => $request->amount * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('success'),
            'cancel_url' => route('animals'),
        ]);

        return Inertia::location($session->url);
    }
}

// TODO : Autres moyen de paiement ?
