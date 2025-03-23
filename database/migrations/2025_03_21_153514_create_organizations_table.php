<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id(); // identifiant de l'organisation
            $table->string('name'); //
            $table->string('address'); //
            $table->string('phone'); //
            $table->string('email'); //
            $table->string('iban'); //
            $table->string('website'); //
            $table->timestamps(); // created_at - updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
