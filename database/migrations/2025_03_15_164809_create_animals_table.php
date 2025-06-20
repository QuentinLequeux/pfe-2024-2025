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
        Schema::create('animals', function (Blueprint $table) {
            $table->id(); // identifiant de l'animal
            $table->string('name'); // Nom de l'animal
            $table->integer('age'); // Age de l'animal
            $table->integer('weight'); // Poids de l'animal
            $table->text('description')->nullable(); // Description de l'animal
            $table->date('arrival_date'); // Date d'arrivée de l'animal
            $table->string('gender'); // Sexe de l'animal
            $table->string('adoption_status'); // Statut de l'animal
            $table->string('photo')->nullable(); // Photo de l'animal

            // Clés étrangères

            $table->foreignId('breed_id')->constrained(); // Clé étrangère vers la table "races"
            $table->foreignId('organization_id')->constrained(); // Clé étrangère vers la table "organization"
            $table->timestamps(); // created_at - updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
