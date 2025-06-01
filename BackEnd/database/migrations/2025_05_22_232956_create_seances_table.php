<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('seances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_seance_id')->constrained('types_seance');
            $table->foreignId('coach_id')->constrained('coachs');
            $table->foreignId('salle_id')->constrained('salles');
            $table->dateTime('date_heure');
            $table->integer('places_max');
            $table->boolean('annulee')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seances');
    }
};