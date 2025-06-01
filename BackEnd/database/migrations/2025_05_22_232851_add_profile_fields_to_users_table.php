<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nom', 50)->default('');
            $table->string('prenom', 50)->default('');
            $table->string('num_tel', 20)->default('');
            $table->text('adresse')->default('');
            $table->string('avatar')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nom', 'prenom', 'num_tel', 'adresse', 'avatar']);
        });
    }
}; 