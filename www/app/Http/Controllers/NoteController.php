<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Response;
use DB;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function note($id)
    {
       $note= Note::where("ArticelId",$id)->first();
      return  json_decode($note)->content;

    }


    public function updateNote(Request $request)
    {
        // $note = Note::where("ArticelId",$request->ArticelId)->get();
         DB::update("update notes set content='".$request->Notes."' where ArticelId=".$request->ArticelId);

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
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //
    }
}
