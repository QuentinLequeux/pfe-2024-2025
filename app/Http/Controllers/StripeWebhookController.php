<?php

namespace App\Http\Controllers;

use Stripe\Webhook;
use App\Models\Transaction;
use Illuminate\Http\Request;
use UnexpectedValueException;
use Stripe\Exception\SignatureVerificationException;

class StripeWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = config('services.stripe.webhook');

        try {
            $event = Webhook::constructEvent(
                $payload, $sigHeader, $secret
            );
        } catch(UnexpectedValueException) {
            return response('Invalid payload', 400);
        } catch(SignatureVerificationException) {
            return response('Invalid signature', 400);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $paymentIntent = $event->data->object;

                Transaction::create([
                   'stripe_id' => $paymentIntent->payment_intent,
                    'amount' => $paymentIntent->amount_total / 100,
                    'currency' => strtoupper($paymentIntent->currency),
                    'status' => $paymentIntent->status,
                    'method' => $paymentIntent->payment_method_types[0] ?? 'Inconnu',
                    'user_id' => (int) $paymentIntent->metadata->user_id,
                    'animal_id' => (int) $paymentIntent->metadata->animal_id,
                    'organization_id' => (int) $paymentIntent->metadata->organization_id,
                ]);
                break;

                case 'payment_intent.failure':
                    break;
        }
        return response('Webhook handled', 200);
    }
}
