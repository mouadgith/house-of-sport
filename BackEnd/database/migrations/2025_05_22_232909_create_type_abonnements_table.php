<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('types_abonnement', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->integer('duree_jours');
            $table->decimal('prix', 10, 2);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('types_abonnement');
    }
};