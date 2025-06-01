<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('adherent_seance', function (Blueprint $table) {
            $table->foreignId('adherent_id')->constrained();
            $table->foreignId('seance_id')->constrained();
            $table->timestamps();
            $table->primary(['adherent_id', 'seance_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('adherent_seance');
    }
};