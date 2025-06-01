<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('adherents', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('prenom', 50);
            $table->date('date_naissance')->nullable();
            $table->enum('sexe', ['M', 'F'])->nullable();
            $table->string('telephone', 20)->nullable();
            $table->decimal('poids', 5, 2)->nullable();
            $table->date('date_inscription')->default(DB::raw('CURRENT_DATE'));
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('adherents');
    }
};