<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('types_seance', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->date('date')->nullable();
            $table->integer('duree_minutes')->default(60);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('types_seance');
    }
};