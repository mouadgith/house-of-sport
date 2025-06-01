<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('abonnement_id')->constrained();
            $table->dateTime('date_paiement')->useCurrent();
            $table->enum('statut', ['Payé', 'En attente', 'Annulé'])->default('Payé');
            $table->decimal('montant', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('paiements');
    }
};