<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/products',[productController::class, 'index'])->name('products.index');
    Route::post('/products', [productController::class, 'store'])->name('products.store');
    Route::get('/products/create', [productController::class, 'create'])->name('products.create');
    Route::get('/products/{product}/edit', [productController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [productController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [productController::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
