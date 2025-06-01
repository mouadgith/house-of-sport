<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;








/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// routes/api.php
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\AdherentController;

Route::apiResource('adherents', AdherentController::class);
Route::get('adherents/{adherent}/abonnements', [AdherentController::class, 'abonnements']);
Route::get('adherents/{adherent}/seances', [AdherentController::class, 'seances']);

use App\Http\Controllers\CoachController;
Route::apiResource('coachs', CoachController::class);
    Route::get('coachs/{coach}/seances', [CoachController::class, 'seances']);

use App\Http\Controllers\AbonnementController;
Route::apiResource('abonnements', AbonnementController::class);

use App\Http\Controllers\PaiementController;  
Route::apiResource('paiements', PaiementController::class);
Route::get('abonnements/{abonnement}/paiements', [PaiementController::class, 'byAbonnement']);

use App\Http\Controllers\SeanceController;
Route::apiResource('seances', SeanceController::class);
Route::post('seances/{seance}/register/{adherent}', [SeanceController::class, 'registerAdherent']);
Route::post('seances/{seance}/unregister/{adherent}', [SeanceController::class, 'unregisterAdherent']);

use App\Http\Controllers\TypeAbonnementController;   
Route::apiResource('types-abonnement', TypeAbonnementController::class);

use App\Http\Controllers\TypeSeanceController;
Route::apiResource('types-seance', TypeSeanceController::class);

use App\Http\Controllers\SalleController; 
Route::apiResource('salles', SalleController::class);
Route::get('salles/{salle}/seances', [SalleController::class, 'seances']);
