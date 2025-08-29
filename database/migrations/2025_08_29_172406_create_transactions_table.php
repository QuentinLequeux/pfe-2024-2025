<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('stripe_id');
            $table->integer('amount');
            $table->string('currency');
            $table->string('status');
            $table->string('method');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('animal_id')->constrained();
            $table->foreignId('organization_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
