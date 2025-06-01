<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('abonnements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('adherent_id')->constrained();
            $table->foreignId('type_abonnement_id')->constrained('types_abonnement');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('abonnements');
    }
};