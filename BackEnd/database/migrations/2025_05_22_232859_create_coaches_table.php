<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('coachs', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('prenom', 50);
            $table->string('tel', 20)->default('');
            $table->text('adresse')->default('');
            $table->enum('sexe', ['M', 'F'])->default('M');
            $table->date('date_naissance')->default(DB::raw('CURRENT_DATE'));
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('coachs');
    }
};