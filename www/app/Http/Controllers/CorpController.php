<?php

namespace App\Http\Controllers;

use App\Models\Corp;
use Illuminate\Http\Request;

class CorpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function corps()
    {
      return Corp::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(Corp $corp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Corp $corp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Corp $corp)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Corp $corp)
    {
        //
    }
}
