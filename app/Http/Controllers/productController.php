<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class productController extends Controller
{
    public function index()
    {
        return Inertia::render('products/Index', [
  
        ]);
    }
}


