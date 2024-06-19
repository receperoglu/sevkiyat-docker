<?php

namespace App\Http\Controllers;

use App\Models\SalesType;
use Illuminate\Http\Request;

class SalesTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function salestypes()
    {
      return SalesType::all();
    }





    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SalesType $salesType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SalesType $salesType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SalesType $salesType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalesType $salesType)
    {
        //
    }
}
