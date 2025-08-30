<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StripeWebhookController;

Route::get('/search', [SearchController::class, 'search'])->name('search');

Route::post('/stripe/webhook', [StripeWebhookController::class, 'handleWebhook']);
